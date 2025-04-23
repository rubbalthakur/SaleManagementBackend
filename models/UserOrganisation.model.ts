import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

import { User } from "./User.model";
import { OrganisationProfile } from "./OrganisationProfile.model";
import { Role } from "./Role.model";

export class UserOrganisation extends Model {
  public id!: number;
  public userId!: number;
  public organisationId!: number;
  public roleId!: number;

  static associate(models: any) {
    UserOrganisation.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    UserOrganisation.belongsTo(models.OrganisationProfile, {
      foreignKey: "organisationId",
      onDelete: "CASCADE",
    });
    UserOrganisation.belongsTo(models.Role, {
      foreignKey: "roleId",
      onDelete: "CASCADE",
    });
  }
}

UserOrganisation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    organisationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: OrganisationProfile,
        key: "id",
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: "id",
      },
    },
  },
  {
    tableName: "userOrganisation",
    sequelize,
  }
);
