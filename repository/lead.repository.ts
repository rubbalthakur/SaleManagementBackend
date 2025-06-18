import {
  Lead,
  LeadSource,
  LeadType,
  OrganisationProfile,
  User,
  Proposal,
  Client,
} from "../models";

export class LeadRepository {
  async findById(id: number): Promise<Lead | null> {
    return await Lead.findByPk(id);
  }

  async findAllByUserId(userId: number): Promise<Lead[] | []> {
    return await Lead.findAll({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName", "emailId"],
        },
        {
          model: LeadType,
          attributes: ["leadTypeName"],
        },
        {
          model: LeadSource,
          attributes: ["leadSourceName"],
        },
        { model: Proposal, include: [{ model: Client }] },
      ],
    });
  }

  async getLeadsByOrganisation(userId: number) {
    return await OrganisationProfile.findOne({
      where: { userId },
      include: [
        {
          model: Lead,
          attributes: [
            "id",
            "userId",
            "organisationId",
            "leadTypeId",
            "leadSourceId",
            "description",
            "status",
          ],
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName", "emailId"],
            },
            {
              model: LeadType,
              attributes: ["leadTypeName"],
            },
            {
              model: LeadSource,
              attributes: ["leadSourceName"],
            },
            { model: Proposal },
          ],
        },
      ],
    });
  }

  async create(leadData: Partial<Lead>) {
    return await Lead.create(leadData);
  }

  async update(leadData: Partial<Lead>) {
    return await Lead.update(leadData, { where: { id: leadData.id } });
  }
}
