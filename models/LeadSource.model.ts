import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

import { OrganisationProfile } from "./OrganisationProfile.model";
import { Lead } from "./Lead.model";

export class LeadSource extends Model {
  public id!: number;
  public organisationId!: number;
  public leadSourceName!: string;

  static associate(models: any) {
    LeadSource.belongsTo(models.OrganisationProfile, {
      foreignKey: "organisationId",
    });
    LeadSource.hasMany(models.Lead, {
      foreignKey: "leadSourceId",
    });
  }
}

LeadSource.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    organisationId: {
      type: DataTypes.INTEGER,
      references: {
        model: OrganisationProfile,
        key: "id",
      },
    },
    leadSourceName: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "leadSources",
    sequelize,
  }
);
