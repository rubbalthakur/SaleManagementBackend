import { sequelize } from "../config/database";

import { User } from "./User.model";
import { OrganisationProfile } from "./OrganisationProfile.model";
import { UserOrganisation } from "./UserOrganisation.model";
import { Role } from "./Role.model";
import { LeadSource } from "./LeadSource.model";
import { LeadType } from "./LeadType.model";
import { Lead } from "./Lead.model";
import { LeadMessage } from "./LeadMessage.model";
import { Client } from "./Client.model";
import { Proposal } from "./Proposal.model";

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync();
    const defaultRoles = [
      { id: 1, role: 'admin' },
      { id: 2, role: 'manager' },
      { id: 3, role: 'employee' },
    ];

    for (const defaultRole of defaultRoles) {
      const [roleInstance, created] = await Role.findOrCreate({
        where: { id: defaultRole.id },
        defaults: {
          id: defaultRole.id,
          role: defaultRole.role,
        }
      });

      if (created) {
        console.log(`Role '${defaultRole.role}' created successfully.`);
      } else {
        console.log(`Role '${defaultRole.role}' already exists.`);
      }
    }

  } catch (error) {
    console.error("Database connection failed", error);
    throw error;
  }
};

User.associate(sequelize.models);
OrganisationProfile.associate(sequelize.models);
UserOrganisation.associate(sequelize.models);
Role.associate(sequelize.models);
LeadSource.associate(sequelize.models);
LeadType.associate(sequelize.models);
Lead.associate(sequelize.models);
LeadMessage.associate(sequelize.models);
Client.associate(sequelize.models);
Proposal.associate(sequelize.models);

export {
  connectDb,
  User,
  OrganisationProfile,
  UserOrganisation,
  Role,
  LeadSource,
  LeadType,
  Lead,
  LeadMessage,
  Client,
  Proposal,
};
