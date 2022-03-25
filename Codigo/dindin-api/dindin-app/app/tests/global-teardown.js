const { __drop__, close } = require("../database")

module.exports = async () => {
    try {
        //close();
        __drop__();
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
}