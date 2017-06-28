import { Role } from '../controllers';
import Authentication from '../middleware/Authentication';

const roleRoutes = (app) => {
  app.post(
    '/roles',
    Authentication.checkToken,
    Authentication.allowAdmin,
    Role.create
  );
  app.get('/roles', Authentication.checkToken, Role.list);
  app.get(
    '/roles/:roleId',
    Authentication.checkToken,
    Authentication.allowAdmin,
    Role.find
  );
  app.put(
    '/roles/:roleId',
    Authentication.checkToken,
    Authentication.allowAdmin,
    Role.update
  );
  app.delete(
    '/roles/:roleId',
    Authentication.checkToken,
    Authentication.allowAdmin,
    Role.delete
  );
};

export default roleRoutes;
