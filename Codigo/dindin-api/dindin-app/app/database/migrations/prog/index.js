const {exec} = require('child_process');

const migrate = () => new Promise((resolve, reject) => {
    console.log("run migrate")
    const migrate = exec(
      `sequelize-cli db:migrate  --env 'test'`,
      {env: process.env},
      err => (err ? reject(err): resolve())
    );
  
    // Forward stdout+stderr to this process
    migrate.stdout.pipe(process.stdout);
    migrate.stderr.pipe(process.stderr);
});

module.exports = migrate