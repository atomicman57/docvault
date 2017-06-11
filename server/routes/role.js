const { Role } = require('../controllers');

const roleRoutes = (app) => {
  app.post('/roles', Role.create);
  app.get('/roles', Role.list);
  app.get('/roles/:roleId', Role.find);
  app.put('/roles/:roleId', Role.update);
  app.delete('/roles/:roleId', Role.delete);
};

export default roleRoutes;
