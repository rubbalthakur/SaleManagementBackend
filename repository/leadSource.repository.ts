import { LeadSource, OrganisationProfile } from "../models";

export class LeadSourceRepository {
  async findById(id: number): Promise<LeadSource | null> {
    return await LeadSource.findByPk(id);
  }
  async getLeadSourceByOrganisation(id: number) {
    return await OrganisationProfile.findOne({
      where: { id },
      include: [
        {
          model: LeadSource,
          attributes: ["id", "leadSourceName"],
        },
      ],
    });
  }

  async create(leadSourceData: Partial<LeadSource>): Promise<LeadSource> {
    return await LeadSource.create(leadSourceData);
  }

  async update(leadSourceData: Partial<LeadSource>) {
    return await LeadSource.update(leadSourceData, {
      where: { id: leadSourceData.id },
    });
  }
}
