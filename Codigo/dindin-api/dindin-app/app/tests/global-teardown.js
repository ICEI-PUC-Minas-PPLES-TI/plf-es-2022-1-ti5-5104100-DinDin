const { __drop__ } = require("../database")

module.exports = async () => {
  try {
    __drop__();
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
