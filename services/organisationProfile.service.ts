import { OrganisationProfile } from "../models";
import { OrganisationProfileRepository } from "../repository/organisationProfile.repository";
import { UserOrganisationRepository } from "../repository/userOrganisation.repository";

export class OrganisationProfileService {
  private organisationProfileRepository = new OrganisationProfileRepository();
  private userOrganisationRepository = new UserOrganisationRepository();

  async getOrganisationProfileById(
    id: number
  ): Promise<OrganisationProfile | null> {
    return await this.organisationProfileRepository.findById(id);
  }

  async update(organisationData: Partial<OrganisationProfile>) {
    return await this.organisationProfileRepository.update(organisationData);
  }

  async getOrganisationProfileByUserId(
    userId: number
  ): Promise<OrganisationProfile | null> {
    return await this.organisationProfileRepository.findByUserId(userId);
  }

  async createOrUpdateOrganisationProfile(
    organisationData: Partial<OrganisationProfile>
  ) {
    const organisationProfile = await this.getOrganisationProfileByUserId(
      organisationData.userId!
    );
    if (!organisationProfile) {
      //------------------------create organisation profile and UserOrganisation relation for admin--------------
      const newOrganisationProfile =
        await this.organisationProfileRepository.create(organisationData);
      return await this.userOrganisationRepository.create({
        organisationId: newOrganisationProfile.id,
        userId: newOrganisationProfile.userId,
        roleId: 1,
      });
    }
    return await this.update(organisationData);
  }
}
