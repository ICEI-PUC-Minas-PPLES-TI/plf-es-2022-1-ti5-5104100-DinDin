const { Router } = require("express");
const walletCategoryRoutes = Router();

const AuthenticationMiddleware = require("../middleware/AuthenticationMiddleware");
const UserAccessWalletMiddleware = require("../middleware/UserAccessWalletMiddleware");
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

walletCategoryRoutes.post(
    "/:id/category/",
    [
        AuthenticationMiddleware.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    createCategoryController.create
);
walletCategoryRoutes.get(
    "/:id/category/:categoryId",
    [
        AuthenticationMiddleware.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    findCategoryController.find
);
walletCategoryRoutes.get(
    "/:id/category/",
    [
        AuthenticationMiddleware.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    listCategoryController.list
);
walletCategoryRoutes.put(
    "/:id/category/:categoryId",
    [
        AuthenticationMiddleware.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    updateCategoryController.update
);
walletCategoryRoutes.delete(
    "/:id/category/:categoryId",
    [
        AuthenticationMiddleware.verifyToken,
        UserAccessWalletMiddleware.verifyWalletPermission,
    ],
    deleteCategoryController.delete
);

module.exports = walletCategoryRoutes;
