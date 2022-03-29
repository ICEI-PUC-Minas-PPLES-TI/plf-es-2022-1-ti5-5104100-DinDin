const ListGoalUseCase = require("./ListGoalUseCase")

class ListGoalController {

  async find(request, response) {
    const listGoalUseCase = new ListGoalUseCase();

    // let status = [];
    // let statusTemp = statusEnums;
    // if (query.status) {
    //   statusTemp = query.status.split(",");
    //   statusTemp.forEach(element => {
    //     if (element == "AC") status.push("AGUARDANDOC");
    //     else if (element == "AA") status.push("AGUARDANDOA");
    //     else if (element == "R") status.push("REALIZADO");
    //     else if (element == "C") status.push("CANCELADO");
    //     else
    //       throw new AppError(
    //         "Status não encontrado/inválido!",
    //         422,
    //         "'status' não encontrado"
    //       );
    //   });
    // } else {
    //   status = statusEnums;
    // }

    const goals = await listGoalUseCase.list(request.query);

    return response.status(200).json({
      dados: goals.dados,
      quantidade: goals.quantidade,
      total: goals.total,
      paginas: goals.paginas,
      offset: goals.offset
    });
  }

}

module.exports = ListGoalController;
