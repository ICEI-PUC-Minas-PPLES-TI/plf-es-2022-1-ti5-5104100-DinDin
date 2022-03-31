const AppError = require("../../../errors/AppError");
const Goal = require("../../../models/Goal");
const { SortPaginate } = require("../../../");
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
        //const qtd = await Goal.count({where: whre});
        //const qtd = await Goal.count();
        console.log(query);
        const perPage = query.limit ? + query.limit : 10;
        const offset = query.page ? (query.page - 1)* perPage : 0;
    
        const goals = await Goal.findAndCountAll({
          limit: perPage,
          offset: offset         
        }).catch(error => {
          throw new AppError("Erro interno do servidor!", 500, error);
        });
    
        return {
          quantidade: goals.rows.length,
          total: goals.count,
          paginas: Math.ceil(goals.count / perPage),
          goals: goals.rows
        };
      }
}

module.exports = ListGoalUseCase;
