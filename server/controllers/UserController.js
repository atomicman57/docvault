import jwt from 'jsonwebtoken';
import { User } from '../models';

const createToken = (user) => {
  jwt.sign(user, 'secretTokenKey', { expiresIn: '24h' });
};
class UserController {
  static create(req, res) {
    return User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      roleId: req.body.role
    })
      .then((user) => {
        const userInfo = { _id: user.id };
        const token = createToken(userInfo);

        res.status(200).json({
          message: 'Sucessful here is ur details:',
          token,
          userDetails: user
        });
      })
      .catch(error => res.status(400).send(error));
  }

  static login(req, res) {
    return User
      .findOne({
        where: { username: req.body.username }
      })
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .json({
              success: false,
              error: 'User not found'
            });
        }

        if (user.password != req.body.password) {
          return res.status(401).json({ message: 'Wrong Password' });
        }

        const userInfo = { _id: user.id };
        const token = createToken(userInfo);

        res.status(200)
          .json({
            success: true,
            token,
            user
          });
      })
      .catch(error => res.status(400).json(error));
  }


  static list(req, res) {
    return User
      .all()
      .then(user => res.status(200).json(user))
      .catch(error => res.status(400).json(error));
  }

  static find(req, res) {
    return User
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'user Not Found',
          });
        }
        return res.status(200).json(user);
      })
      .catch(error => res.status(400).json(error));
  }

  static update(req, res) {
    return User
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'user Not Found',
          });
        }
        return user
          .update({
            title: req.body.title || user.title,
          })
          .then(() => res.status(200).send(user))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }

  static delete(req, res) {
    return User
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'user Not Found',
          });
        }
        return user
          .destroy()
          .then(() => res.status(200).json({ message: 'Deleted' }))
          .catch(error => res.status(400).json(error));
      })
      .catch(error => res.status(400).json(error));
  }
}

export default UserController;
