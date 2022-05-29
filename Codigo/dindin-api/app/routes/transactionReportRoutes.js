const { Router } = require("express");
const transactionReportRoutes = Router();

const AuthenticationMiddleware = require("../middleware/AuthenticationMiddleware");

const ReportUserTotalTransactionController = require("../usecases/transaction/reportUserTotalTransaction/ReportUserTotalTransactionController");
const ReportWalletBalanceTransactionController = require("../usecases/transaction/reportWalletBalanceTransaction/ReportWalletBalanceTransactionController");
const ReportWalletDailyBalanceTransactionController = require("../usecases/transaction/reportWalletDailyBalanceTransaction/ReportWalletDailyBalanceTransactionController");
const ReportWalletCategoryTransactionController = require("../usecases/transaction/reportWalletCategoryTransaction/ReportWalletCategoryTransactionController");
const ReportWalletGoalTransactionController = require("../usecases/transaction/reportWalletGoalTransaction/ReportWalletGoalTransactionController");

const reportUserTotalTransactionController =
    new ReportUserTotalTransactionController();
const reportWalletBalanceTransactionController =
    new ReportWalletBalanceTransactionController();
const reportWalletDailyBalanceTransactionController =
    new ReportWalletDailyBalanceTransactionController();
const reportWalletCategoryTransactionController =
    new ReportWalletCategoryTransactionController();
const reportWalletGoalTransactionController =
    new ReportWalletGoalTransactionController();

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

transactionReportRoutes.get(
    "/goal/:id",
    [AuthenticationMiddleware.verifyToken],
    reportWalletGoalTransactionController.report
);

module.exports = transactionReportRoutes;
