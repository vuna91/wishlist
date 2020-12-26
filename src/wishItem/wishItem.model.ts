import { DataTypes, Model } from 'sequelize';
import { sequelize } from './../common/postgres';
import { WishItem, WishItemCreation } from './wishItem.type';

interface WishItemInstance
  extends Model<WishItem, WishItemCreation>,
    WishItem {}

export const WishItemModel = sequelize.define<WishItemInstance>('WishItem', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  wishId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
