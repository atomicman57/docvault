import jwt from 'jsonwebtoken';
import { User, Role } from '../models';
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
    const token = req.headers.Authorization || req.query.token || req.headers['Authorization'];
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
  static checkAdmin(req, res, next) {
    User.findById(req.decoded.id)
    .then((user) => {
      Role.findById(user.roleId)
        .then((role) => {
          if (role.title === 'Admin') {
            next();
          } else {
            return res.status(403)
            .json({
              message: 'Sorry, You do not have sufficient permission' });
          }
        });
    });
  }
}
export default Middleware;

