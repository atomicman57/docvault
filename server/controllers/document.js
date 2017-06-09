import { Document } from '../models';

class DocumentController {
  create(req, res) {
    return Document.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId,
      accessLevelId: req.body.accesslevel
    })
      .then(document => res.status(201).send(document))
      .catch(error => res.status(400).send(error));
  }

  list(req, res) {
    return Document.all()
      .then(document => res.status(200).send(document))
      .catch(error => res.status(400).send(error));
  }

  find(req, res) {
    return Document.findById(req.params.documentId)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found'
          });
        }
        return res.status(200).send(document);
      })
      .catch(error => res.status(400).send(error));
  }

  update(req, res) {
    return Document.findById(req.params.documentId)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found'
          });
        }
        if (document.userId != req.body.userId) {
          return res.json({
            message: 'You do not have the permission to edit this document'
          });
        }
        console.log(req.body.title);
        return document
          .update({
            title: req.body.title || document.title
          })
          .then(() => res.status(200).send(document))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }

  delete(req, res) {
    return Document.findById(req.params.documentId)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found'
          });
        }
        console.log(req.user);
        if (document.userId != req.user.id && req.user.roleId != 1) {
          return res.json({
            message: 'You do not have the permission to edit this document'
          });
        }
        return document
          .destroy()
          .then(() => res.status(200).send({ message: 'Deleted' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
}
export default new DocumentController();
