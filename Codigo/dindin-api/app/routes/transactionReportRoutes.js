const { Router } = require("express");
const transactionReportRoutes = Router();

const AuthenticationMiddleware = require("../middleware/AuthenticationMiddleware");

const CategoryBelongsUserMiddleware = require("../middleware/CategoryBelongsUserMiddleware");

const ReportUserTotalTransactionController = require("../usecases/transaction/reportUserTotalTransaction/ReportUserTotalTransactionController");
const reportUserTotalTransactionController =
    new ReportUserTotalTransactionController();

transactionReportRoutes.get(
    "/usertotal",
    [
        AuthenticationMiddleware.verifyToken,
        CategoryBelongsUserMiddleware.verifyCategoryBelongsUser,
    ],
    reportUserTotalTransactionController.report
);

module.exports = transactionReportRoutes;
