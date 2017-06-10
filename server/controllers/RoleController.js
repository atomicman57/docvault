import { Role } from '../models';

/**
 *
 */
class RoleController {

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static create(req, res) {
    return Role.create({
      name: req.body.name
    })
      .then(roles => res.status(201).send(roles))
      .catch(error => res.status(400).send(error));
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static list(req, res) {
    return Role.all()
      .then(roles => res.status(200).send(roles))
      .catch(error => res.status(400).send(error));
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static find(req, res) {
    return Role.findById(req.params.roleId)
      .then((roles) => {
        if (!roles) {
          return res.status(404).send({
            message: 'roles Not Found'
          });
        }
        return res.status(200).json(roles);
      })
      .catch(error => res.status(400).json(error));
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static update(req, res) {
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
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static delete(req, res) {
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
}

export default RoleController;
