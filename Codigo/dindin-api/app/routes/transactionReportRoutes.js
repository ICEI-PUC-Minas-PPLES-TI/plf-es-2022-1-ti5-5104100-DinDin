const { Router } = require("express");
const transactionReportRoutes = Router();

const AuthenticationMiddleware = require("../middleware/AuthenticationMiddleware");

const ReportUserTotalTransactionController = require("../usecases/transaction/reportUserTotalTransaction/ReportUserTotalTransactionController");
const ReportWalletBalanceTransactionController = require("../usecases/transaction/reportWalletBalanceTransaction/ReportWalletBalanceTransactionController");

const reportUserTotalTransactionController =
    new ReportUserTotalTransactionController();
const reportWalletBalanceTransactionController =
    new ReportWalletBalanceTransactionController();

transactionReportRoutes.get(
    "/usertotal",
    [AuthenticationMiddleware.verifyToken],
    reportUserTotalTransactionController.report
);

transactionReportRoutes.get(
    "/balance",
    [AuthenticationMiddleware.verifyToken],
    reportWalletBalanceTransactionController.report
);

module.exports = transactionReportRoutes;
