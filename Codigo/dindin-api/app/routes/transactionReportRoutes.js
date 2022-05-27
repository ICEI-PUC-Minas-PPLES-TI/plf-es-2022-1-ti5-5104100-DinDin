const { Router } = require("express");
const transactionReportRoutes = Router();

const AuthenticationMiddleware = require("../middleware/AuthenticationMiddleware");

const ReportUserTotalTransactionController = require("../usecases/transaction/reportUserTotalTransaction/ReportUserTotalTransactionController");
const ReportWalletBalanceTransactionController = require("../usecases/transaction/reportWalletBalanceTransaction/ReportWalletBalanceTransactionController");
const ReportWalletDailyBalanceTransactionController = require("../usecases/transaction/reportWalletDailyBalanceTransaction/ReportWalletDailyBalanceTransactionController");
const ReportWalletCategoryTransactionController = require("../usecases/transaction/reportWalletCategoryTransaction/ReportWalletCategoryTransactionController");

const reportUserTotalTransactionController =
    new ReportUserTotalTransactionController();
const reportWalletBalanceTransactionController =
    new ReportWalletBalanceTransactionController();
const reportWalletDailyBalanceTransactionController =
    new ReportWalletDailyBalanceTransactionController();
const reportWalletCategoryTransactionController =
    new ReportWalletCategoryTransactionController();

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

transactionReportRoutes.get(
    "/category",
    [AuthenticationMiddleware.verifyToken],
    reportWalletCategoryTransactionController.report
);

module.exports = transactionReportRoutes;
