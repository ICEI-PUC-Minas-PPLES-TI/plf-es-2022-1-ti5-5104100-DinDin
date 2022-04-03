const { Router } = require("express");
const categoryRoutes = Router();

const CreateCategoryController = require("../usecases/createCategory/CreateCategoryController");
const DeleteCategoryController = require("../usecases/deleteCategory/DeleteCategoryController");
const FindCategoryController = require("../usecases/findCategory/FindCategoryController");
const ListCategoryController = require("../usecases/listCategories/ListCategoriesController");
const UpdateCategoryController = require("../usecases/updateCategory/UpdateCategoryController");

const createCategoryController = new CreateCategoryController();
const findCategoryController = new FindCategoryController();
const listCategoryController = new ListCategoryController
const deleteCategoryController = new DeleteCategoryController();
const updateCategoryController = new UpdateCategoryController();

categoryRoutes.post('/',createCategoryController.create);
categoryRoutes.get('/:id',findCategoryController.find);
categoryRoutes.get('/',listCategoryController.findAll);
categoryRoutes.put('/:id', updateCategoryController.update)
categoryRoutes.delete('/:id',deleteCategoryController.delete)
module.exports = categoryRoutes;
