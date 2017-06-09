import { Document } from '../controllers';
import Authentication from '../middleware/Authentication';

module.exports = (app) => {
  // document endpoints
  // Setup a default catch-all route that sends back a welcome message in JSON format.
  app.get('/', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the beginning of nothingness.'
    })
  );
//   app.use(Authentication);
  app.post('/documents', Document.create);
  app.get('/documents', Document.list);
  app.get('/documents/:documentId', Document.find);
  app.put('/documents/:documentId', Document.update);
  app.delete('/documents/:documentId', Document.delete);
  app.get('/test', (req, res) => {
    res.status(200).send('Test Test');
  });
};
