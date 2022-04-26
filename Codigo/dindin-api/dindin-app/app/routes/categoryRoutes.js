const { Router } = require("express");
const categoryRoutes = Router();

const CreateCategoryController = require("../usecases/category/createCategory/CreateCategoryController");
const DeleteCategoryController = require("../usecases/category/deleteCategory/DeleteCategoryController");
const FindCategoryController = require("../usecases/category/findCategory/FindCategoryController");
const ListCategoryController = require("../usecases/category/listCategories/ListCategoriesController");
const UpdateCategoryController = require("../usecases/category/updateCategory/UpdateCategoryController");

const createCategoryController = new CreateCategoryController();
const findCategoryController = new FindCategoryController();
const listCategoryController = new ListCategoryController();
const deleteCategoryController = new DeleteCategoryController();
const updateCategoryController = new UpdateCategoryController();

categoryRoutes.post("/", createCategoryController.create);
categoryRoutes.get("/:id", findCategoryController.find);
categoryRoutes.get("/", listCategoryController.list);
categoryRoutes.put("/:id", updateCategoryController.update);
categoryRoutes.delete("/:id", deleteCategoryController.delete);

module.exports = categoryRoutes;
