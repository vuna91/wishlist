import { DataTypes, Model } from 'sequelize';
import { sequelize } from './../common/postgres';
import { Wish, WishCreation, WishWithItem } from './wish.type';
import { WishItemModel } from './../wishItem/wishItem.model';

interface WishInstance extends Model<Wish, WishCreation>, Wish, WishWithItem {}

export const WishModel = sequelize.define<WishInstance>('Wish', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.NUMBER,
    allowNull: false
  }
});

WishModel.hasMany(WishItemModel, {
  sourceKey: 'id',
  foreignKey: 'wishId',
  as: 'items'
});
