import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

import { OrganisationProfile } from "./OrganisationProfile.model";
import { Lead } from "./Lead.model";

export class LeadType extends Model {
  public id!: number;
  public organisationId!: number;
  public leadTypeName!: string;

  static associate(models: any) {
    LeadType.belongsTo(models.OrganisationProfile, {
      foreignKey: "organisationId",
    });
    LeadType.hasMany(models.Lead, {
      foreignKey: "leadTypeId",
    });
  }
}

LeadType.init(
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
    leadTypeName: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "leadTypes",
    sequelize,
  }
);
