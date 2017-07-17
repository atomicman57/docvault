import { Document } from '../controllers';
import Authentication from '../middleware/Authentication';

const documentRoutes = (app) => {
  app.get('/search/documents', Authentication.checkToken, Document.list);
  app.post('/documents', Authentication.checkToken, Document.create);
  app.get('/documents', Authentication.checkToken, Document.list);
  app.get(
    '/documents/:documentId',
    Authentication.checkToken,
    Authentication.allowUserOrAdminAccessDoc,
    Document.find
  );
  app.put(
    '/documents/:documentId',
    Authentication.checkToken,
   Authentication.allowUserOrAdminAccessDoc,
    Document.update
  );
  app.delete(
    '/documents/:documentId',
    Authentication.checkToken,
   Authentication.allowUserOrAdminAccessDoc,
    Document.delete
  );
};

export default documentRoutes;
