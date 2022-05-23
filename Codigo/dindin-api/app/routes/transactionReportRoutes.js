const { Router } = require("express");
const transactionReportRoutes = Router();

const AuthenticationMiddleware = require("../middleware/AuthenticationMiddleware");

const ReportUserTotalTransactionController = require("../usecases/transaction/reportUserTotalTransaction/ReportUserTotalTransactionController");
const ReportWalletBalanceTransactionController = require("../usecases/transaction/reportWalletBalanceTransaction/ReportWalletBalanceTransactionController");
const ReportWalletDailyBalanceTransactionController = require("../usecases/transaction/reportWalletDailyBalanceTransaction/ReportWalletDailyBalanceTransactionController");

const reportUserTotalTransactionController =
    new ReportUserTotalTransactionController();
const reportWalletBalanceTransactionController =
    new ReportWalletBalanceTransactionController();
const reportWalletDailyBalanceTransactionController =
    new ReportWalletDailyBalanceTransactionController();

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

transactionReportRoutes.get(
    "/dailybalance",
    [AuthenticationMiddleware.verifyToken],
    reportWalletDailyBalanceTransactionController.report
);

module.exports = transactionReportRoutes;
