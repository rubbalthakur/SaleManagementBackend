import { LeadSource } from "../models";
import { LeadSourceRepository } from "../repository/leadSource.repository";
import { OrganisationProfileService } from "./organisationProfile.service";
import { UserOrganisationRepository } from "../repository/userOrganisation.repository";

export class LeadSourceService {
  private leadSourceRepository = new LeadSourceRepository();
  private organisationProfileService = new OrganisationProfileService();
  private userOrganisationRepository = new UserOrganisationRepository();

  async getAllLeadSourceByOrganisation(userId: number) {
    const userOrganisation = await this.userOrganisationRepository.findByUserId(
      userId
    );
    if (!userOrganisation) {
      throw new Error("Organisation Profile not found");
    }
    const organisationId = userOrganisation.organisationId;
    return await this.leadSourceRepository.getLeadSourceByOrganisation(
      organisationId
    );
  }

  async getById(id: number): Promise<LeadSource | null> {
    return await this.leadSourceRepository.findById(id);
  }

  async create(leadSourceData: Partial<LeadSource>): Promise<LeadSource> {
    return await this.leadSourceRepository.create(leadSourceData);
  }

  async update(leadSourceData: Partial<LeadSource>) {
    return await this.leadSourceRepository.update(leadSourceData);
  }

  async createLeadSource(
    userId: number,
    leadSourceName: string
  ): Promise<LeadSource> {
    const organisationProfile =
      await this.organisationProfileService.getOrganisationProfileByUserId(
        userId
      );
    if (!organisationProfile) {
      throw new Error("Organisation Profile not found");
    }
    const organisationId = organisationProfile.id;
    return await this.create({
      organisationId,
      leadSourceName,
    });
  }

  async updateLeadSource(leadSourceData: Partial<LeadSource>) {
    if (leadSourceData.id === undefined) {
      throw new Error("Lead Source id is required");
    }
    const leadSource = await this.getById(leadSourceData.id);
    if (!leadSource) {
      throw new Error("Lead Source not found");
    }
    return await this.update(leadSourceData);
  }
}
