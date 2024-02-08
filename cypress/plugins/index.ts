/// <reference types="cypress" />
import mysql, { Connection, MysqlError } from 'mysql';
import { MongoClient } from 'mongodb';

/**
 * Creates a new MySQL connection using the provided database configuration.
 */
function connectToMySQL(dbConfig: mysql.ConnectionConfig): Connection {
  const connection: Connection = mysql.createConnection(dbConfig);
  connection.connect();
  return connection;
}

/**
 * Executes a MySQL query and returns a promise that resolves with the results.
 */
function queryMySQL(connection: Connection, query: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    connection.query(query, (error: MysqlError | null, results: unknown) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
}

/**
 * Connects to MongoDB and returns the client.
 */
async function connectToMongoDB(mongoDbUri: string): Promise<MongoClient> {
  const client: MongoClient = new MongoClient(mongoDbUri);
  await client.connect();
  return client;
}

/**
 * Cypress Plugin Configuration
 */
export default (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): void => {
  // MySQL task
  on('task', {
    queryDb: (query: string): Promise<unknown> => {
      const connection = connectToMySQL(config.env.db as mysql.ConnectionConfig);
      return queryMySQL(connection, query).finally(() => connection.end());
    },
  });

  // MongoDB task
  on('task', {
    queryMongoDB: async ({ collectionName, query, operation }: { collectionName: string; query: Record<string, unknown>; operation: string; }): Promise<unknown> => {
      const client = await connectToMongoDB(config.env.MONGODB_URI as string);
      const db = client.db(config.env.MONGODB_DB_NAME);
      const collection = db.collection(collectionName);

      try {
        let result: unknown;
        switch (operation) {
          case 'find':
            result = await collection.find(query).toArray();
            break;
          // Include other operations like insert, update, delete, etc.
          default:
            throw new Error(`Operation "${operation}" not supported`);
        }
        return result;
      } catch (error) {
        throw error;
      } finally {
        await client.close();
      }
    },
  });

  // Add other plugin event handlers below if needed
};
