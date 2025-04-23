import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Lead } from "./Lead.model";
import { User } from "./User.model";

export class LeadMessage extends Model {
  id!: number;
  leadId!: number;
  userId!: number;
  message!: string;

  static associate(models: any) {
    LeadMessage.belongsTo(models.Lead, {
      foreignKey: "leadId",
      onDelete: "CASCADE",
    });
    LeadMessage.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  }
}

LeadMessage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    leadId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Lead,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "leadMessages",
    sequelize,
  }
);
