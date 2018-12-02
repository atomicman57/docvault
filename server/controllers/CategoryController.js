import { Category } from "../models";

/**
 * category Controller
 */
class CategoryController {
  /**
   * Create category
   * It creates a category with name.
   * @param {object} req request
   * @param {object} res response
   * @return {object} categories
   */
  static create(req, res) {
    return Category.create({
      name: req.body.name
    })
      .then(categories => res.status(201).json(categories))
      .catch(error => res.status(400).json(error));
  }

  /**
   * List categories
   * It lists all categories.
   * @param {object} req request
   * @param {object} res response
   */
  static list(req, res) {
    return Category.all()
      .then(categories => res.status(200).json(categories))
      .catch(error => res.status(400).json(error));
  }

  /**
   * Find category
   * It returns a Category.
   * @param {object} req request
   * @param {object} res response
   */
  static find(req, res) {
    return Category.findById(req.params.categoryId)
      .then(categories => {
        if (!categories) {
          return res.status(404).json({
            message: "category Not Found"
          });
        }
        return res.status(200).json(categories);
      })
      .catch(error => res.status(400).json(error));
  }

  /**
   * Update category
   * It update/edit a category given the Id.
   * @param {object} req request
   * @param {object} res response
   */
  static update(req, res) {
    return Category.findById(req.params.categoryId)
      .then(category => {
        if (!category) {
          return res.status(404).json({
            message: "category Not Found"
          });
        }
        return category
          .update({
            name: req.body.name || category.name
          })
          .then(() => res.status(200).json(category))
          .catch(error => res.status(400).json(error));
      })
      .catch(error => res.status(400).json(error));
  }

  /**
   * Delete category
   * It deletes a Category.
   * @param {object} req request
   * @param {object} res response
   */
  static delete(req, res) {
    return Category.findById(req.params.categoryId)
      .then(category => {
        if (!category) {
          return res.status(404).json({
            message: "category Not Found"
          });
        }
        return category.destroy().then(() => res.send(200));
      })
      .catch(error => res.status(400).json(error));
  }
}

export default CategoryController;
