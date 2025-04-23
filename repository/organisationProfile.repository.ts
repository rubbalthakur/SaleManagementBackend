import { OrganisationProfile } from "../models";

export class OrganisationProfileRepository {
  async findById(id: number): Promise<OrganisationProfile | null> {
    return await OrganisationProfile.findByPk(id);
  }

  async findByUserId(userId: number): Promise<OrganisationProfile | null> {
    return await OrganisationProfile.findOne({ where: { userId } });
  }

  async create(
    organisationData: Partial<OrganisationProfile>
  ): Promise<OrganisationProfile> {
    return OrganisationProfile.create(organisationData);
  }

  async update(organisationData: Partial<OrganisationProfile>) {
    return OrganisationProfile.update(organisationData, {
      where: { userId: organisationData.userId },
    });
  }
}
