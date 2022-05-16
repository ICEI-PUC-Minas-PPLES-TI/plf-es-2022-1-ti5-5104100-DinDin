const { Router } = require("express");
const categoryRoutes = Router();

const AuthenticationMiddleware = require("../middleware/AuthenticationMiddleware");

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

categoryRoutes.post(
    "/",
    [AuthenticationMiddleware.verifyToken],
    createCategoryController.create
);
categoryRoutes.get(
    "/:id",
    [AuthenticationMiddleware.verifyToken],
    findCategoryController.find
);
categoryRoutes.get(
    "/",
    [AuthenticationMiddleware.verifyToken],
    listCategoryController.list
);
categoryRoutes.put(
    "/:id",
    [AuthenticationMiddleware.verifyToken],
    updateCategoryController.update
);
categoryRoutes.delete(
    "/:id",
    [AuthenticationMiddleware.verifyToken],
    deleteCategoryController.delete
);

module.exports = categoryRoutes;
