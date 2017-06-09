import { User } from '../controllers';
import Authentication from '../middleware/Authentication';

module.exports = (app) => {
  app.post('/users', User.create);
  app.get('/users', User.list);

  app.use(Authentication);
  app.get('/users/:id', User.find);
  app.put('/users/:id', User.update);
  app.delete('/users/:id', User.delete);
};
