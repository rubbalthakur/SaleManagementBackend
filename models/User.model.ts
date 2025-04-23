import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

import { OrganisationProfile } from "./OrganisationProfile.model";
import { UserOrganisation } from "./UserOrganisation.model";
import { Lead } from "./Lead.model";

import bcrypt from "bcrypt";

export class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public emailId!: string;
  public password!: string;
  public country!: string;
  public state!: string;
  public city!: string;
  public contact!: string;

  static associate(models: any) {
    User.hasOne(models.OrganisationProfile, {
      foreignKey: "userId",
    });
    User.hasOne(models.UserOrganisation, {
      foreignKey: "userId",
    });
    User.hasMany(models.Lead, {
      foreignKey: "userId",
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(128),
    },
    lastName: {
      type: DataTypes.STRING(128),
    },
    emailId: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(128),
    },
    state: {
      type: DataTypes.STRING(128),
    },
    country: {
      type: DataTypes.STRING(128),
    },
    contact: {
      type: DataTypes.STRING(128),
    },
  },
  {
    tableName: "users",
    sequelize,
    hooks: {
      beforeCreate: async (user: User) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
    },
  }
);
