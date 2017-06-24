import jwt from 'jsonwebtoken';
import { User, Document, Role } from '../models';

const createToken = (user) => {
  return jwt.sign(user, 'secretTokenKey', { expiresIn: '24h' });
};

class UserController {
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
    User.findOne({
      where: {
        $or: [
          {
            username: req.body.username
          },
          {
            email: req.body.email
          }
        ]
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

          return res.status(201).json({
            message: 'Sign up Sucessful here is ur details:',
            token,
            userDetails: userInfo
          });
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    });
  }

  static login(req, res) {
    return User.findOne({
      where: { email: req.body.email }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'User not found'
          });
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

          res.status(200).json({
            message: 'Login Sucessful here is ur details:',
            token,
            userInfo
          });
        } else {
          return res.status(401).json({ message: 'Wrong Password' });
        }
      })
      .catch(error => res.status(400).json(error));
  }

  static logout(request, response) {
    response.status(200).json({
      message: 'User logged out'
    });
  }

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
          {
            username: {
              $iLike: `%${search}%`
            }
          },
          {
            firstname: {
              $iLike: `%${search}%`
            }
          },
          {
            lastname: {
              $iLike: `%${search}%`
            }
          }
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
        res.status(400).json(error);
      });
  }

  static find(req, res) {
    return User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'User Not Found'
          });
        }
        return res.status(200).json(user);
      })
      .catch(error => res.status(400).json(error));
  }

  static update(req, res) {
    return User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'User Not Found'
          });
        }
        if (req.body.password) {
          req.body.password = user.encryptUpdatePassword(req.body.password);
        }
        return user
          .update(req.body)
          .then((user) => {
            const userInfo = {
              id: user.id,
              username: user.username,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              roleId: user.roleId
            };
            res.status(200).json(userInfo);
          })
          .catch(error => res.status(400).json(error));
      })
      .catch(error => res.status(400).json(error));
  }

  static delete(req, res) {
    return User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'user Not Found'
          });
        }
        return user
          .destroy()
          .then(() => res.status(200).json({ message: 'Deleted' }))
          .catch(error => res.status(400).json(error));
      })
      .catch(error => res.status(400).json(error));
  }


  static personalDocuments(req, res) {
    let search = '%%';
    if (req.query.q) {
      search = `%${req.query.q}%`;
    }
    Document.findAndCountAll({
      where: {
        userId: req.params.id,
        title: { $iLike: search }
      },
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
      .catch(error => res.status(400).json(error));
  }

  static search(req, res) {
    const search = req.query.q;
    return User.findAll({
      where: {
        $or: [
          {
            username: {
              $iLike: `%${search}%`
            }
          },
          {
            firstname: {
              $iLike: `%${search}%`
            }
          },
          {
            lastname: {
              $iLike: `%${search}%`
            }
          }
        ]
      }
    })
      .then((user) => {
        if (user.length === 0) {
          return res.status(404).json({
            message: 'Sorry, No User found'
          });
        }
        return res.status(200).json({
          user
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
          message: 'An Error occurred'
        });
      });
  }
}

export default UserController;
