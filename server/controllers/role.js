import { Role } from '../models';

module.exports = {
  create(req, res) {
    return Role.create({
      name: req.body.name
    })
      .then(roles => res.status(201).send(roles))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Role.all()
      .then(roles => res.status(200).send(roles))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Role.findById(req.params.roleId)
      .then((roles) => {
        if (!roles) {
          return res.status(404).send({
            message: 'roles Not Found'
          });
        }
        return res.status(200).send(roles);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Role.findById(req.params.roleId)
      .then((roles) => {
        if (!roles) {
          return res.status(404).send({
            message: 'roles Not Found'
          });
        }
        return roles
          .update({
            title: req.body.title || roles.title
          })
          .then(() => res.status(200).send(roles))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return Role.findById(req.params.roleId)
      .then((roles) => {
        if (!roles) {
          return res.status(404).send({
            message: 'roles Not Found'
          });
        }
        return roles
          .destroy()
          .then(() => res.status(200).send({ message: 'Deleted' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
