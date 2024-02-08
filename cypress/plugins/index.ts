/// <reference types="cypress" />
import mysql from "mysql";

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// For connecting to SQL Server
const queryTestDb = (query: string, config: Cypress.PluginConfigOptions) => {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.env.db);
  // start connection to db
  connection.connect();
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error: mysql.MysqlError | null, results: any) => {
      if (error) reject(error);
      else {
        connection.end();
        return resolve(results);
      }
    });
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  on('task', {
    queryDb: (query: string) => {
      return queryTestDb(query, config);
    },
  }); // For running SQL query

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // Add other plugin event handlers below
};
