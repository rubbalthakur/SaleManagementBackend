import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

import { OrganisationProfile } from "./OrganisationProfile.model";
import { Proposal } from "./Proposal.model";

export class Client extends Model {
  public id!: number;
  public organisationId!: number;
  public firstName!: string;
  public lastName!: string;
  public emailId!: string;
  public country!: string;
  public state!: string;
  public city!: string;
  public contact!: string;

  static associate(models: any) {
    Client.belongsTo(models.OrganisationProfile, {
      foreignKey: "organisationId",
      onDelete: "CASCADE",
    });
    Client.hasMany(models.Proposal, { foreignKey: "clientId" });
  }
}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    organisationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: OrganisationProfile, key: "id" },
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
    tableName: "clients",
    sequelize,
  }
);
