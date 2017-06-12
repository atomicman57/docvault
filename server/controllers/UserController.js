import jwt from 'jsonwebtoken';
import { User, Document } from '../models';

const createToken = (user) => {
  return jwt.sign(user, 'secretTokenKey', { expiresIn: '24h' });
};

class UserController {
  static create(req, res) {
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

          return res.status(200).json({
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
      where: { username: req.body.username }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            error: 'User not found'
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
    if (req.query.limit || req.query.offset) {
      return User.findAndCountAll({
        limit: req.query.limit,
        offset: req.query.offset
      })
        .then((user) => {
          const limit = req.query.limit;
          const offset = req.query.offset;
          const totalCount = user.count;
          const pageCount = Math.ceil(totalCount / limit);
          const currentPage = Math.floor(offset / limit) + 1;
          const pageSize =
          (totalCount - offset) > limit ? limit : (totalCount - offset);
          res.status(200).json({
            user: user.rows,
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
    return User.all()
      .then(user => res.status(200).json(user))
      .catch(error => res.status(400).json(error));
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
        return user
          .update(req.body)
          .then(() => res.status(200).json(user))
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
    User.findAll({
      include: [
        {
          model: Document,
          as: 'documents'
        }
      ]
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'User does not exist'
          });
        }
        return res.status(200).json(user);
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
