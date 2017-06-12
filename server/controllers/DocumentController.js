import { User, Document } from '../models';

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
    if (req.body.title === '' || req.body.content === ''
      || req.body.accessLevelId === '') {
      return res.status(400).send({
        message: 'Fields cannot be empty'
      });
    }
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
    if (req.query.limit || req.query.offset) {
      return Document.findAndCountAll({
        limit: req.query.limit,
        offset: req.query.offset
      })
        .then((document) => {
          const limit = req.query.limit;
          const offset = req.query.offset;
          const totalCount = document.count;
          const pageCount = Math.ceil(totalCount / limit);
          const currentPage = Math.floor(offset / limit) + 1;
          res.status(200).json({ document: document.rows,
            pagination: {
              totalCount,
              limit,
              offset,
              pageCount,
              currentPage
            }
          });
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    }
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
          .update(req.body)
          .then(() => res.status(200).json(document))
          .catch(error => res.status(400).json(error));
      })
      .catch(error => res.status(400).json(error));
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


  static myDocuments(req, res) {
    return Document
    .findAll({
      where: {
        $or: [
          { accessLevelId: 1 },
          // {
          //   role: 1
          // },
          {
            userId: req.decoded.id
          }
        ]
      },
      // include: [User],
      // order: [['updatedAt', 'DESC']]
    })
    .then((document) => {
      if (!document) {
        return res.status(404).json({
          message: 'Document Not Found',
        });
      }
      return res.status(200).json(document);
    })
    .catch(error => res.status(400).json({
      error,
      message: 'An Error occurred'
    }));
  }

  static search(req, res) {
    const search = req.query.q;
    return Document.findAll({
      where: {
        title: {
          $iLike: `%${search}%`
        }
      }
    })
      .then((documents) => {
        if (documents.length === 0) {
          return res.status(404).json({
            message: 'Sorry, No document found'
          });
        }
        return res.status(200).json({
          documents
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
          message: 'An Error occurred'
        });
      });
  }
}
export default DocumentController;
