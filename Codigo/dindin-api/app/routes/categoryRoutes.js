const { Router } = require("express");
const categoryRoutes = Router();

const jwtAuthorization = require("./jwtAuthorization");

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
    [jwtAuthorization.verifyToken],
    createCategoryController.create
);
categoryRoutes.get(
    "/:id",
    [jwtAuthorization.verifyToken],
    findCategoryController.find
);
categoryRoutes.get(
    "/",
    [jwtAuthorization.verifyToken],
    listCategoryController.list
);
categoryRoutes.put(
    "/:id",
    [jwtAuthorization.verifyToken],
    updateCategoryController.update
);
categoryRoutes.delete(
    "/:id",
    [jwtAuthorization.verifyToken],
    deleteCategoryController.delete
);

module.exports = categoryRoutes;
