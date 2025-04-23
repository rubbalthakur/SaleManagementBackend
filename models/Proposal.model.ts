import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

import { OrganisationProfile } from "./OrganisationProfile.model";
import { Lead } from "./Lead.model";
import { Client } from "./Client.model";

export class Proposal extends Model {
  public id!: number;
  public organisationId!: number;
  public leadId!: number;
  public clientId!: number;
  public cost!: number;
  public status!: string;

  static associate(models: any) {
    Proposal.belongsTo(models.OrganisationProfile, {
      foreignKey: "organisationId",
      onDelete: "CASCADE",
    });
    Proposal.belongsTo(models.Lead, {
      foreignKey: "leadId",
      onDelete: "CASCADE",
    });
    Proposal.belongsTo(models.Client, {
      foreignKey: "clientId",
      onDelete: "CASCADE",
    });
  }
}

Proposal.init(
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
    leadId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: { model: Lead, key: "id" },
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Client, key: "id" },
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "proposals",
    sequelize,
  }
);
