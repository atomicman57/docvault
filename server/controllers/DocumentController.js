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
    if (
      req.body.title === '' || req.body.content === '' || req.body.access === ''
    ) {
      return res.status(400).json({
        message: 'Fields cannot be empty'
      });
    }

    if (
      req.body.title.length < 4 || req.body.content < 4
    ) {
      return res.status(400).json({
        message: 'Title and content length must be more than 4'
      });
    }

    return Document.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.decoded.id,
      access: req.body.access,
      userRoleId: req.decoded.roleId
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
    let search = '%%';
    if (req.query.q) {
      search = `%${req.query.q}%`;
    }
    let query;
    if (req.decoded) {
      query = req.decoded.roleId === 2
        ? {
          title: { $iLike: search },
          $or: [
              { access: 'public' },
              { access: 'role' },
              { $and: [{ access: 'private' }, { userId: req.decoded.id }] }
          ]
        }
        : {
          $or: [
              { access: 'public' },
            {
              userId: req.decoded.id
            },
            {
              userId: req.decoded.id,
              $and: [
                  { access: 'private' },
                  { $not: [{ userRoleId: req.decoded.roleId }] }
              ]
            },
            {
              $and: [
                  { access: 'role' },
                  { $and: [{ userRoleId: req.decoded.roleId }] }
              ]
            }
          ],
          title: { $iLike: search }
        };
    }

    return Document.findAndCountAll({
      limit: req.query.limit || 15,
      offset: req.query.offset || 0,
      where: query,
      include: [
        {
          model: User,
          attributes: ['username', 'roleId']
        }
      ],
      order: [['createdAt', 'DESC']]
    })
      .then((document) => {
        const limit = req.query.limit || 15;
        const offset = req.query.offset || 0;
        const totalCount = document.count;
        const pageCount = Math.ceil(totalCount / limit);
        const currentPage = Math.floor(offset / limit) + 1;
        res.status(200).json({
          document: document.rows,
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
      });
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static update(req, res) {
    return Document.findById(req.params.documentId)
      .then((document) => {
        return document
          .update(req.body)
          .then(() => res.status(200).json(document))
          .catch(error => res.status(400).json(error));
      });
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static delete(req, res) {
    return Document.findById(req.params.documentId)
      .then((document) => {
        return document
          .destroy()
          .then(() => res.status(200).json({ message: 'Deleted' }));
      });
  }
}
export default DocumentController;
