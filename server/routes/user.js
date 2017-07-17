import { User } from '../controllers';
import Authentication from '../middleware/Authentication';

const userRoutes = (app) => {
  app.post('/users', User.create);
  app.get(
    '/users',
    Authentication.checkToken,
    Authentication.allowAdmin,
    User.list
  );
  app.get(
    '/search/users',
    Authentication.checkToken,
    Authentication.allowAdmin,
    User.list
  );

  app.post('/users/login', User.login);
  app.get(
    '/users/:id',
    Authentication.checkToken,
    Authentication.allowUserOrAdmin,
    User.find
  );
  app.put(
    '/users/:id',
    Authentication.checkToken,
    Authentication.allowUserOrAdmin,
    User.update
  );
  app.delete(
    '/users/:id',
    Authentication.checkToken,
    Authentication.allowUserOrAdmin,
    User.delete
  );
  app.get(
    '/users/:id/documents',
    Authentication.checkToken,
    Authentication.allowUserOrAdmin,
    User.personalDocuments
  );
};

export default userRoutes;
