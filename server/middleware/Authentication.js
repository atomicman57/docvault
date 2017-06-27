import jwt from 'jsonwebtoken';
import { User, Role, Document } from '../models';
/**
 *
 */
class Middleware {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static checkToken(req, res, next) {
    const token = req.headers.authorization || req.query.token;
    if (!token) {
      return res.status(403).json({
        success: false,
        message: 'No token provided'
      });
    }

    jwt.verify(token, 'secretTokenKey', (error, decoded) => {
      if (error) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token'
        });
      }
      req.decoded = decoded;
      next();
    });
  }

  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @memberof Middleware
   */
  static checkAdmin(req, res, next) {
    User.findById(req.decoded.id).then((user) => {
      Role.findById(user.roleId).then((role) => {
        if (role.title === 'Admin') {
          next();
        } else {
          return res.status(403).json({
            message: 'Sorry, You do not have sufficient permission'
          });
        }
      });
    });
  }

  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @returns
   * @memberof Middleware
   */
  static allowUserOrAdminn(req, res, next) {
    return User.findById(req.params.id).then((user) => {
      if (!user) return res.status(404).send({ message: 'No User Found' });
      if (res.decoded.roleId !== 2 && res.decoded.id !== user.id) {
        return res.status(403).send({ message: 'You do not have access' });
      }

      res.user = user;
      return next();
    });
  }

  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @returns
   * @memberof Middleware
   */
  static allowUserOrAdmin(req, res, next) {
    return Document.findById(req.params.documentId).then((document) => {
      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }

      if (
        req.decoded.roleId === 2 &&
        document.userId !== req.decoded.id &&
        document.access === 'private'
      ) {
        return res
          .status(403)
          .json({ message: 'You do not have access to private documents' });
      }

      if (req.decoded.roleId === 2) {
        return next();
      }

      if (req.decoded.id !== document.userId) {
        return res.status(403).send({ message: 'You do not have access' });
      }

      res.document = document;
      return next();
    });
  }
}
export default Middleware;
