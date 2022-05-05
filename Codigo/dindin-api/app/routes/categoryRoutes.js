const { Router } = require("express");
const categoryRoutes = Router();

const JwtAuthorization = require("../middleware/JwtAuthorizationMiddleware");

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
    [JwtAuthorization.verifyToken],
    createCategoryController.create
);
categoryRoutes.get(
    "/:id",
    [JwtAuthorization.verifyToken],
    findCategoryController.find
);
categoryRoutes.get(
    "/",
    [JwtAuthorization.verifyToken],
    listCategoryController.list
);
categoryRoutes.put(
    "/:id",
    [JwtAuthorization.verifyToken],
    updateCategoryController.update
);
categoryRoutes.delete(
    "/:id",
    [JwtAuthorization.verifyToken],
    deleteCategoryController.delete
);

module.exports = categoryRoutes;
