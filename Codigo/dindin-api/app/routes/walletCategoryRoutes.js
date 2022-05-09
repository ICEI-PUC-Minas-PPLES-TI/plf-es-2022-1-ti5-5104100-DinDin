const { Router } = require("express");
const walletCategoryRoutes = Router();

const jwtAuthorization = require("./jwtAuthorization");
const UserAccessWalletCategoryMiddleware = require("../middleware/UserAccessWalletCategoryMiddleware");

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
    "/wallet/:walletId/category/",
    [
        jwtAuthorization.verifyToken,
        UserAccessWalletCategoryMiddleware.verifyWalletCategoryPermission,
    ],    
    createCategoryController.create
);
walletCategoryRoutes.get(
    "/wallet/:walletId/category/:categoryId",
    [
        jwtAuthorization.verifyToken,
        UserAccessWalletCategoryMiddleware.verifyWalletCategoryPermission,
    ],
    findCategoryController.find
);
walletCategoryRoutes.get(
    "/wallet/:walletId/category/",
    [
        jwtAuthorization.verifyToken,
        UserAccessWalletCategoryMiddleware.verifyWalletCategoryPermission,
    ],
    listCategoryController.list
);
walletCategoryRoutes.put(
    "/wallet/:walletId/category/:categoryId",
    [
        jwtAuthorization.verifyToken,
        UserAccessWalletCategoryMiddleware.verifyWalletCategoryPermission,
    ],    
    updateCategoryController.update
);
walletCategoryRoutes.delete(
    "/wallet/:walletId/category/:categoryId",
    [
        jwtAuthorization.verifyToken,
        UserAccessWalletCategoryMiddleware.verifyWalletCategoryPermission,
    ],
    deleteCategoryController.delete
);

module.exports = walletCategoryRoutes;
