import { User } from '../controllers';
// import Authentication from '../middleware/Authentication';

const userRoutes = (app) => {
  app.post('/users', User.create);
  app.get('/users', User.list);
  app.get('/search/users', User.search);

  app.post('/users/login', User.login);
  app.get('/users/:id', User.find);
  app.put('/users/:id', User.update);
  app.delete('/users/:id', User.delete);
  app.post('/users/logout', User.logout);
  app.get('/users/:id/documents', User.personalDocuments);
};

export default userRoutes;
