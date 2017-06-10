import { Document } from '../models';

/**
 *
 */
class DocumentController {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @return{*} document
   */
  static create(req, res) {
    return Document.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId,
      accessLevelId: req.body.accesslevel
    })
      .then(document => res.status(201).json(document))
      .catch(error => res.status(400).json(error));
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */

  static list(req, res) {
    return Document.all()
      .then(document => res.status(200).json(document))
      .catch(error => res.status(400).json(error));
  }
  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static find(req, res) {
    return Document.findById(req.params.documentId)
      .then((document) => {
        if (!document) {
          return res.status(404).json({
            message: 'Document Not Found'
          });
        }
        return res.status(200).json(document);
      })
      .catch(error => res.status(400).json(error));
  }


  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static update(req, res) {
    return Document.findById(req.params.documentId)
      .then((document) => {
        if (!document) {
          return res.status(404).json({
            message: 'Document Not Found'
          });
        }
        if (document.userId != req.body.userId) {
          return res.json({
            message: 'You do not have the permission to edit this document'
          });
        }
        return document
          .update({
            title: req.body.title || document.title
          })
          .then(() => res.status(200).json(document))
          .catch(error => res.status(400).json(error));
      })
      .catch(error => res.status(400).jsob(error));
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static delete(req, res) {
    return Document.findById(req.params.documentId)
      .then((document) => {
        if (!document) {
          return res.status(404).json({
            message: 'Document Not Found'
          });
        }
        console.log(req.user);
        if (document.userId != req.body.userId && req.body.roleId != 1) {
          return res.json({
            message: 'You do not have the permission to edit this document'
          });
        }
        return document
          .destroy()
          .then(() => res.status(200).json({ message: 'Deleted' }))
          .catch(error => res.status(400).json(error));
      })
      .catch(error => res.status(400).json(error));
  }
}
export default DocumentController;
