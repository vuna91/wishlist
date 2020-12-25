import { Sequelize } from 'sequelize';

const username = process.env.POSTGRES_USER || 'postgres';
const password = process.env.POSTGRES_PASSWORD || '123';
const dbName = 'wishlist';
const host = '127.0.0.1';
export const sequelize = new Sequelize(dbName, username, password, {
  host,
  dialect: 'postgres'
});

export const connectPostgres = async (): Promise<void> => {
  await sequelize.authenticate();
};
