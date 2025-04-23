import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

import { User } from "./User.model";
import { OrganisationProfile } from "./OrganisationProfile.model";
import { LeadSource } from "./LeadSource.model";
import { LeadType } from "./LeadType.model";
import { Proposal } from "./Proposal.model";

export class Lead extends Model {
  public id!: number;
  public userId!: number;
  public organisationId!: number;
  public leadTypeId!: number;
  public leadSourceId!: number;
  public description!: string;
  public status!: string;

  static associate(models: any) {
    Lead.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE" });
    Lead.belongsTo(models.OrganisationProfile, {
      foreignKey: "organisationId",
      onDelete: "CASCADE",
    });
    Lead.belongsTo(models.LeadSource, {
      foreignKey: "leadSourceId",
      onDelete: "CASCADE",
    });
    Lead.belongsTo(models.LeadType, {
      foreignKey: "leadTypeId",
      onDelete: "CADCADE",
    });
    Lead.hasOne(models.Proposal, { foreignKey: "leadId", onDelete: "CASCADE" });
  }
}

Lead.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    leadTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: LeadType,
        key: "id",
      },
    },
    leadSourceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: LeadSource,
        key: "id",
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "leads",
    sequelize,
  }
);
