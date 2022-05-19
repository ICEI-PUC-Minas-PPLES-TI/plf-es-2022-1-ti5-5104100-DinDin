const { Router } = require("express");
const transactionReportRoutes = Router();

const AuthenticationMiddleware = require("../middleware/AuthenticationMiddleware");

const ReportUserTotalTransactionController = require("../usecases/transaction/reportUserTotalTransaction/ReportUserTotalTransactionController");
const reportUserTotalTransactionController =
    new ReportUserTotalTransactionController();

transactionReportRoutes.get(
    "/usertotal",
    [AuthenticationMiddleware.verifyToken],
    reportUserTotalTransactionController.report
);

module.exports = transactionReportRoutes;
