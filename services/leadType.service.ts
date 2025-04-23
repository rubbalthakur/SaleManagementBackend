import { LeadType } from "../models";
import { LeadTypeRepository } from "../repository/leadType.repository";
import { OrganisationProfileService } from "./organisationProfile.service";
import { UserOrganisationRepository } from "../repository/userOrganisation.repository";

export class LeadTypeService {
  private leadTypeRepository = new LeadTypeRepository();
  private organisationProfileService = new OrganisationProfileService();
  private userOrganisationRepository = new UserOrganisationRepository();

  async getAllLeadTypeByOrganisation(userId: number) {
    const userOrganisation = await this.userOrganisationRepository.findByUserId(
      userId
    );
    if (!userOrganisation) {
      throw new Error("Organisation Profile not found");
    }
    const organisationId = userOrganisation.organisationId;
    return await this.leadTypeRepository.getLeadTypeByOrganisation(
      organisationId
    );
  }

  async getById(id: number): Promise<LeadType | null> {
    return await this.leadTypeRepository.findById(id);
  }

  async create(leadTypeData: Partial<LeadType>): Promise<LeadType> {
    return await this.leadTypeRepository.create(leadTypeData);
  }

  async update(leadTypeData: Partial<LeadType>) {
    return await this.leadTypeRepository.update(leadTypeData);
  }

  async createLeadType(
    userId: number,
    leadTypeName: string
  ): Promise<LeadType> {
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
      leadTypeName,
    });
  }

  async updateLeadType(leadTypeData: Partial<LeadType>) {
    if (leadTypeData.id === undefined) {
      throw new Error("Lead Type id is required");
    }
    const leadType = await this.getById(leadTypeData.id);
    if (!leadType) {
      throw new Error("Lead Type not found");
    }
    return await this.update(leadTypeData);
  }
}
