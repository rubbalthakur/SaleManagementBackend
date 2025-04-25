import {
  Proposal,
  User,
  UserOrganisation,
  OrganisationProfile,
  Lead,
  Client,
} from "../models";

export class ProposalRepository {
  async findById(id: number): Promise<Proposal | null> {
    return await Proposal.findByPk(id);
  }

  async findByLeadId(leadId: number): Promise<Proposal | null> {
    return await Proposal.findOne({ where: { leadId } });
  }
  async findByClientId(clientId: number) {
    return await Proposal.findAll({ where: { clientId } });
  }
  async findByOrganisation(userId: number) {
    return await UserOrganisation.findOne({
      where: { userId },
      include: [
        {
          model: OrganisationProfile,
          attributes: ["id"],
          include: [
            {
              model: Proposal,
              include: [{ model: Client }, { model: Lead }],
            },
          ],
        },
      ],
    });
  }

  async findByUser(userId: number) {
    return await UserOrganisation.findOne({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ["id"],
          include: [
            {
              model: Lead,
              attributes: ["id", "description"],
              include: [
                {
                  model: Proposal,
                  include: [{ model: Client }],
                },
              ],
            },
          ],
        },
      ],
    });
  }

  async create(proposalData: Partial<Proposal>): Promise<Proposal> {
    return await Proposal.create(proposalData);
  }

  async update(proposalData: Partial<Proposal>) {
    return await Proposal.update(proposalData, {
      where: { id: proposalData.id },
    });
  }
}
