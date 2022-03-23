const {exec} = require('child_process');
console.log("importseeder")
const seeder = () => new Promise((resolve, reject) => {
    const seeder = exec(
      `npx sequelize-cli db:seed:all  --env 'test'`,
      {env: process.env},
      err => (err ? reject(err): resolve())
    );
  
    // Forward stdout+stderr to this process
    seeder.stdout.pipe(process.stdout);
    seeder.stderr.pipe(process.stderr);
});

module.exports = seeder