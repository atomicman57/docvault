import jwt from 'jsonwebtoken';

const Authentication = (req, res, next) => {
  const token = req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      success: false,
      message: 'No token provided'
    });
  }

  jwt.verify(token, 'secretTokenKey', (error) => {
    if (error) {
      return res.json({
        success: false,
        message: 'Failed to authenticate token'
      });
    }
    next();
  });
};
export default Authentication;

