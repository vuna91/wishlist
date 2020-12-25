import { Sequelize } from 'sequelize';

const username = process.env.POSTGRES_USER || 'postgres';
const password = process.env.POSTGRES_PASSWORD || '123';
const dbName = 'wishlist';
const host = '127.0.0.1';

const connect = async (): Promise<void> => {
  const sequelize = new Sequelize(dbName, username, password, {
    host,
    dialect: 'postgres'
  });
  await sequelize.authenticate();
};

export default { connect };
