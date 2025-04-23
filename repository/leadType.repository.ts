import { LeadType, OrganisationProfile } from "../models";

export class LeadTypeRepository {
  async findById(id: number): Promise<LeadType | null> {
    return await LeadType.findByPk(id);
  }
  async getLeadTypeByOrganisation(organisationId: number) {
    return await OrganisationProfile.findOne({
      where: { id: organisationId },
      include: [
        {
          model: LeadType,
          attributes: ["id", "leadTypeName"],
        },
      ],
    });
  }

  async create(leadTypeData: Partial<LeadType>): Promise<LeadType> {
    return await LeadType.create(leadTypeData);
  }

  async update(leadTypeData: Partial<LeadType>) {
    return await LeadType.update(leadTypeData, {
      where: { id: leadTypeData.id },
    });
  }
}
