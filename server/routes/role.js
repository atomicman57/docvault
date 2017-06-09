const { Role } = require('../controllers');

module.exports = (app) => {
  // document endpoints
  // Setup a default catch-all route that sends back a welcome message in JSON format.
  app.post('/roles', Role.create);
  app.get('/roles', Role.list);
  app.put('/roles', Role.update);
//   app.get('/documents/:documentId', Document.find);
//   app.put('/documents/:documentId', Document.update);
//   app.delete('/documents/:documentId', Document.delete);
//   app.get('/test', (req, res) => {
//     res.status(200).send('Test Test');
//   });
};
