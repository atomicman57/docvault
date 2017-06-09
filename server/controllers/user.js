const User = require('../models').User;
// const express = require('express');
// const app = express();
const jwt = require('jsonwebtoken');
const createToken = (user) => {
  return jwt.sign(user, 'secretTokenKey');
}
module.exports = {
  create(req, res) {
    return User.create({
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
  },

  login(req, res) {
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
            })
        }

        if (user.password != req.body.password) {
          return res.send('Password does not match');
        }

        const userInfo = { _id: user.id }
        const token = createToken(userInfo);

        res.status(200)
          .json({
            success: true,
            token,
            user
          });
      })
      .catch(error => res.status(400).send(error));
  },

  // logout(req, res) {
  //  return req.logout();
  // },

  list(req, res) {
    return User
      .all()
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
  },

  find(req, res) {
    return User
      .findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'user Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return User
      .findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'user Not Found',
          });
        }
        return user
          .update({
            title: req.body.title || user.title,
          })
          .then(() => res.status(200).send(user))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return User
      .findById(req.params.id)
      .then(user => {
        console.log(user);
        if (!user) {
          return res.status(404).send({
            message: 'user Not Found',
          });
        }
        return user
          .destroy()
          .then(() => res.status(200).send({ message: 'Deleted' }))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
