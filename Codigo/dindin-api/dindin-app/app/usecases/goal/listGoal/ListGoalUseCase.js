const AppError = require("../../../errors/AppError");
const Goal = require("../../../models/Goal");

class ListGoalUseCase {
    async list(query) {
        const statusEnums = [
            "FINISHED",
            "LOST",
            "PENDING"
          ];
    
    
        let whre = {
          status: statusEnums
        }
    
        const qtd = await Goal.count({where: whre});
        const { paginas, ...SortPaginateOptions } = SortPaginate(
          query,
          Object.keys(Goal.rawAttributes) /* Todos os atributos de Goal */,
          qtd
        );
    
        const goals = await Goal.findAndCountAll({
          ...SortPaginateOptions,
          where: whre,
        }).catch(error => {
          throw new AppError("Erro interno do servidor!", 500, error);
        });
    
        return {
          dados: goals.rows,
          quantidade: goals.rows.length,
          total: goals.count,
          paginas: paginas,
          offset: SortPaginateOptions.offset
        };
      }
}

module.exports = ListGoalUseCase;
