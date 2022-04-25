const sequelize = require("sequelize");

const AppError = require("../../../errors/AppError");
const Wallet = require("../../../models/Wallet");
const { SortPaginate } = require("../../../helpers/SortPaginate");
const UserHasWallet = require("../../../models/UserHasWallet");

class ListWalletUseCase {
  async list(query, userId) {

    let whre = {};

    if (query.description) {
      whre.description = sequelize.where(sequelize.fn('LOWER', sequelize.col('description')), 'LIKE', '%' + query.description.toLowerCase() + '%')
    }
    if (query.shared) {
      whre.shared = query.shared
    }

    const attributes = Object.keys(Wallet.getAttributes);
    const walletQuantity = await Wallet.count();
    const sortPaginateOptions = SortPaginate(query, attributes, walletQuantity);

    const wallets = await Wallet.findAndCountAll({
      where: whre,
      limit: sortPaginateOptions.limit,
      offset: sortPaginateOptions.offset,
      order: sortPaginateOptions.order,
      paranoid: sortPaginateOptions.paranoid,
      include: [
        {
          model: UserHasWallet,
          as: 'usuarios',
          where: {
            user_id: userId
          }
        }
      ]
    }).catch((error) => {
      throw new AppError("Erro interno do servidor!", 500, error);
    });

    return {
      count: wallets.rows.length,
      total: wallets.count,
      pages: Math.ceil(wallets.count / sortPaginateOptions.limit),
      wallets: wallets.rows,
    };
  }
}

module.exports = ListWalletUseCase;