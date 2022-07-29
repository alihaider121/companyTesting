const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;
const mysql = require("mysql");
function queryTestDb(query, config) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.env.db);
  // start connection to db
  connection.connect();
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end();
        return resolve(results);
      }
    });
  });
}
// { "testFiles": '**/*.feature' }

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber()),
        on("task", {
          queryDb: (query) => {
            return queryTestDb(query, config);
          },
        });
    },
    // specPattern: "**/*.feature",
    env: {
      db: {
        host: "sql6.freesqldatabase.com",
        user: "sql6509102",
        password: "IhUH8Wg7hi",
        database: "sql6509102",
      },
    },
  },
});
