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
      title: req.body.title
    })
      .then(roles => res.status(201).json(roles))
      .catch(error => res.status(400).json(error));
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static list(req, res) {
    return Role.all()
      .then(roles => res.status(200).json(roles))
      .catch(error => res.status(400).json(error));
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
          return res.status(404).json({
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
          return res.status(404).json({
            message: 'roles Not Found'
          });
        }
        return roles
          .update({
            title: req.body.title || roles.title
          })
          .then(() => res.status(200).json(roles))
          .catch(error => res.status(400).json(error));
      })
      .catch(error => res.status(400).json(error));
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
          return res.status(404).json({
            message: 'roles Not Found'
          });
        }
        return roles
          .destroy()
          .then(() => res.status(200).json({ message: 'Deleted' }))
          .catch(error => res.status(400).json(error));
      })
      .catch(error => res.status(400).json(error));
  }
}

export default RoleController;
