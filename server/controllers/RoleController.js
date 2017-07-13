import { Role } from '../models';

/**
 * Role Controller
 */
class RoleController {

  /**
   * Create Role
   * @param {object} req request
   * @param {object} res response
   * @return {object} roles
   */
  static create(req, res) {
    return Role.create({
      title: req.body.title
    })
      .then(roles => res.status(201).json(roles))
      .catch(error => res.status(400).json(error));
  }

  /**
   * List Roles
   * @param {object} req request
   * @param {object} res response
   */
  static list(req, res) {
    return Role.all()
      .then(roles => res.status(200).json(roles))
      .catch(error => res.status(400).json(error));
  }

  /**
   * Find Role
   * @param {object} req request
   * @param {object} res response
   */
  static find(req, res) {
    return Role.findById(req.params.roleId)
      .then((roles) => {
        if (!roles) {
          return res.status(404).json({
            message: 'Role Not Found'
          });
        }
        return res.status(200).json(roles);
      })
      .catch(error => res.status(400).json(error));
  }

  /**
   * Update Role
   * @param {object} req request
   * @param {object} res response
   */
  static update(req, res) {
    return Role.findById(req.params.roleId)
      .then((roles) => {
        if (!roles) {
          return res.status(404).json({
            message: 'Role Not Found'
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
   * Delete Role
   * @param {object} req request
   * @param {object} res response
   */
  static delete(req, res) {
    return Role.findById(req.params.roleId)
      .then((roles) => {
        if (!roles) {
          return res.status(404).json({
            message: 'Roles Not Found'
          });
        }
        return roles
          .destroy()
          .then(() => res.send(200));
      })
      .catch(error => res.status(400).json(error));
  }
}

export default RoleController;
