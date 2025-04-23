import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

import { UserOrganisation } from "./UserOrganisation.model";

export class Role extends Model {
  public id!: number;
  public role!: string;

  static associate(models: any) {
    Role.hasMany(models.UserOrganisation, { foreignKey: "roleId" });
  }
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "role",
    sequelize,
  }
);
