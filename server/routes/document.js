import { Document } from '../controllers';
import Authentication from '../middleware/Authentication';

const documentRoutes = (app) => {
//   app.use(Authentication);
  app.get('/search/documents', Authentication.checkToken, Document.list);
  app.post('/documents', Document.create);
  app.get('/documents', Authentication.checkToken, Document.list);
  app.get('/documents/allmydocs', Authentication.checkToken, Document.myDocuments);
  app.get('/documents/:documentId', Document.find);
  app.put('/documents/:documentId', Document.update);
  app.delete('/documents/:documentId', Authentication.checkToken, Document.delete);
};


export default documentRoutes;
