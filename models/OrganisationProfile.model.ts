import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

import { User } from "./User.model";
import { UserOrganisation } from "./UserOrganisation.model";
import { LeadType } from "./LeadType.model";
import { LeadSource } from "./LeadSource.model";
import { Lead } from "./Lead.model";
import { Proposal } from "./Proposal.model";
import { Client } from "./Client.model";

export class OrganisationProfile extends Model {
  public id!: number;
  public userId!: number;
  public name!: string;
  public city!: string;
  public state!: string;
  public country!: string;

  static associate(models: any) {
    OrganisationProfile.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    OrganisationProfile.hasMany(models.UserOrganisation, {
      foreignKey: "organisationId",
    });
    OrganisationProfile.hasMany(models.LeadType, {
      foreignKey: "organisationId",
    });
    OrganisationProfile.hasMany(models.LeadSource, {
      foreignKey: "organisationId",
    });
    OrganisationProfile.hasMany(models.Lead, {
      foreignKey: "organisationId",
    });
    OrganisationProfile.hasMany(models.Client, {
      foreignKey: "organisationId",
    });
    OrganisationProfile.hasMany(models.Proposal, {
      foreignKey: "organisationId",
    });
  }
}

OrganisationProfile.init(
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
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "organisationProfile",
    sequelize,
  }
);
