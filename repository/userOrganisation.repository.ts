import { UserOrganisation, OrganisationProfile, User, Role } from "../models";
export class UserOrganisationRepository {
  async getAllBySameOrganisation(userId: number) {
    return await OrganisationProfile.findOne({
      where: { userId },
      include: [
        {
          model: UserOrganisation,
          attributes: ["userId", "roleId", "organisationId"],
          include: [
            { model: User, attributes: ["firstName", "lastName", "emailId"] },
            { model: Role, attributes: ["role"] },
          ],
        },
      ],
    });
  }

  async findByUserId(userId: number) {
    return await UserOrganisation.findOne({ where: { userId } });
  }

  async findById(id: number): Promise<UserOrganisation | null> {
    return await UserOrganisation.findByPk(id);
  }

  async create(
    userOrganisationData: Partial<UserOrganisation>
  ): Promise<UserOrganisation> {
    return await UserOrganisation.create(userOrganisationData);
  }

  async update(userOrganisationData: Partial<UserOrganisation>) {
    return await UserOrganisation.update(userOrganisationData, {
      where: { userId: userOrganisationData.userId },
    });
  }
}
