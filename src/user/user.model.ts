import { DataTypes, Model } from 'sequelize';
import { sequelize } from './../common/postgres';
import { User, UserCreation } from './user.type';

interface UserInstance extends Model<User, UserCreation>, User {}

export const UserModel = sequelize.define<UserInstance>('User', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
