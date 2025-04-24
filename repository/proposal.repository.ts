import {
  Proposal,
  User,
  UserOrganisation,
  OrganisationProfile,
  Lead,
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
    return await OrganisationProfile.findOne({
      where: { userId },
      include: [
        {
          model: Proposal,
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
              attributes: ["id"],
              include: [
                {
                  model: Proposal,
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
