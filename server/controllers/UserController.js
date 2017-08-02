import jwt from 'jsonwebtoken';
import { User, Document, Role } from '../models';

/**
 * Create Token
 * It create token with the user Information
 * @param {object} user
 * @returns token
 */
const createToken = (user) => {
  return jwt.sign(user, process.env.JWTSECRET, { expiresIn: '24h' });
};
const userInfo = (user) => {
  return {
    id: user.id,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    roleId: user.roleId
  };
};

/**
 *
 *
 * @class UserController
 */
class UserController {
  /**
   *
   * Create User
   * It creates a user with the information provided
   * @static
   * @param {object} req request
   * @param {object} res response
   * @returns {object} User
   * @memberof UserController
   */
  static create(req, res) {
    if (
      !req.body.username ||
      !req.body.firstname ||
      !req.body.lastname ||
      !req.body.email ||
      !req.body.password
    ) {
      return res.status(401).json({ message: 'Enter all required field' });
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(401).json({
        message: 'Email is not rightly formatted'
      });
    }
    if (req.body.password.length < 5) {
      return res.status(400).json({
        message: 'Password length must be more than 4'
      });
    }

    if (req.body.username.length < 4) {
      return res.status(400).json({
        message: 'username length must be more than 3'
      });
    }

    if (req.body.firstname.length < 3 || req.body.lastname.length < 3) {
      return res.status(400).json({
        message: 'firstname and lastname length must be more than 2'
      });
    }

    User.findOne({
      where: {
        $or: [{ username: req.body.username }, { email: req.body.email }]
      }
    }).then((existingUser) => {
      if (existingUser) {
        return res.status(409).send({ message: 'User already exists' });
      }
      return User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        roleId: req.body.roleId
      })
        .then((user) => {
          const userInfo = {
            id: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            roleId: user.roleId
          };
          const token = createToken(userInfo);
          return res.status(201).json({ token, userDetails: userInfo });
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    });
  }

  /**
   *
   * User Login
   * It logs user in and return a token
   * @static
   * @param {object} req request
   * @param {object} res response
   * @returns {object} token and user information
   * @memberof UserController
   */
  static login(req, res) {
    return User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        if (user.validatePassword(req.body.password)) {
          const userInfo = {
            id: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            roleId: user.roleId
          };
          const token = createToken(userInfo);
          res.status(200).json({ token, userInfo });
        } else {
          return res.status(401).json({ message: 'Wrong Password' });
        }
      })
      .catch(error => res.status(500).json({ message: 'An Error Ocurred', error }));
  }

  /**
   *
   * List Users
   * It lists all users
   * @static
   * @param {object} req request
   * @param {object} res response
   * @returns {object} Users
   * @memberof UserController
   */
  static list(req, res) {
    let search = '%%';
    if (req.query.q) {
      search = `%${req.query.q}%`;
    }
    return User.findAndCountAll({
      attributes: [
        'id',
        'username',
        'firstname',
        'lastname',
        'email',
        'roleId',
        'createdAt'
      ],
      where: {
        $or: [
          { username: { $iLike: `%${search}%` } },
          { firstname: { $iLike: `%${search}%` } },
          { lastname: { $iLike: `%${search}%` } }
        ],
        $not: [{ id: req.decoded.id }]
      },
      include: [{ model: Role }],
      limit: req.query.limit || 15,
      offset: req.query.offset || 0,
      order: [['createdAt', 'DESC']]
    })
      .then((user) => {
        const limit = req.query.limit || 15;
        const offset = req.query.offset || 0;
        const totalCount = user.count;
        const pageCount = Math.ceil(totalCount / limit);
        const currentPage = Math.floor(offset / limit) + 1;
        const pageSize = totalCount - offset > limit
          ? limit
          : totalCount - offset;
        res.status(200).json({
          users: user.rows,
          pagination: {
            totalCount,
            limit,
            offset,
            pageCount,
            pageSize,
            currentPage
          }
        });
      })
      .catch((error) => {
        res.status(500).json({ message: 'An Error Ocurred', error });
      });
  }

  /**
   *
   * Find User
   * @static
   * @param {object} req request
   * @param {object} res response
   * @returns {object} User
   * @memberof UserController
   */
  static find(req, res) {
    return User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(userInfo(user));
      })
      .catch(error => res.status(500).json({ message: 'An Error Ocurred', error }));
  }

  /**
   *
   * Update User
   * It update/edit a user
   * @static
   * @param {object} req request
   * @param {object} res response
   * @returns
   * @memberof UserController
   */
  static update(req, res) {
    return User.findById(req.params.id).then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (req.body.email || req.body.username) {
        User.findOne({
          where: {
            $or: [{ username: req.body.username }, { email: req.body.email }]
          }
        }).then((existingUser) => {
          if (existingUser) {
            return res.status(409).send({ message: 'Email already Exist' });
          }
        });
      }
      if (req.body.password) {
        req.body.password = user.encryptUpdatePassword(req.body.password);
      }
      return user
        .update(req.body)
        .then((user) => {
          res.status(200).json(userInfo(user));
        })
        .catch(error =>
          res.status(500).json({ message: 'An Error Ocurred', error })
        );
    });
  }

  /**
   *
   * Delete User
   * It delete a user
   * @static
   * @param {object} req request
   * @param {object} res response
   * @memberof UserController
   */
  static delete(req, res) {
    return User.findById(req.params.id).then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return user
        .destroy()
        .then(() => res.send(200))
        .catch(error =>
          res.status(500).json({ message: 'An Error Ocurred', error })
        );
    });
  }

  /**
   *
   * List User Personal Documents
   * It lists documents created by a user by an Id.
   * @static
   * @param {object} req request
   * @param {any} res response
   * @memberof UserController
   */
  static personalDocuments(req, res) {
    let search = '%%';
    if (req.query.q) {
      search = `%${req.query.q}%`;
    }
    let query;
    if (req.decoded) {
      query = req.decoded.roleId === 2
        ? {
          title: { $iLike: search },
          $or: [
              { $and: [{ access: 'private' }, { userId: req.decoded.id }] },
            {
              userId: req.params.id,
              $or: [{ access: 'public' }, { access: 'role' }]
            }
          ]
        }
        : { userId: req.params.id, title: { $iLike: search } };
    }
    Document.findAndCountAll({
      where: query,
      include: [
        {
          model: User,
          attributes: [
            'id',
            'username',
            'firstname',
            'lastname',
            'email',
            'roleId',
            'createdAt'
          ]
        }
      ],
      limit: req.query.limit || 15,
      offset: req.query.offset || 0,
      order: [['createdAt', 'DESC']]
    })
      .then((document) => {
        const limit = req.query.limit || 15;
        const offset = req.query.offset || 0;
        const totalCount = document.count;
        const pageCount = Math.ceil(totalCount / limit);
        const currentPage = Math.floor(offset / limit) + 1;
        return res.status(200).json({
          document: document.rows,
          pagination: {
            totalCount,
            limit,
            offset,
            pageCount,
            currentPage
          }
        });
      })
      .catch(error => res.status(500).json({ message: 'An Error Ocurred', error }));
  }
}

export default UserController;
