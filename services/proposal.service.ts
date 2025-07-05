import { Proposal } from "../models";
import { ProposalRepository } from "../repository/proposal.repository";
import { UserOrganisationRepository } from "../repository/userOrganisation.repository";

export class ProposalService {
  private proposalRepository = new ProposalRepository();
  private userOrganisationRepository = new UserOrganisationRepository();

  async getById(id: number): Promise<Proposal | null> {
    return await this.proposalRepository.findById(id);
  }

  async getByLeadId(leadId: number): Promise<Proposal | null> {
    return await this.proposalRepository.findByLeadId(leadId);
  }

  async getAllByOrganisation(userId: number) {
    return await this.proposalRepository.findByOrganisation(userId);
  }

  async getAllByUser(userId: number) {
    return await this.proposalRepository.findByUser(userId);
  }

  async create(proposalData: Partial<Proposal>): Promise<Proposal> {
    return await this.proposalRepository.create(proposalData);
  }
  async update(proposalData: Partial<Proposal>) {
    return await this.proposalRepository.update(proposalData);
  }
  async updateProposal(proposalData: Partial<Proposal>) {
    if (!proposalData.id) {
      throw new Error("Proposal id is required");
    }
    const proposal = this.getById(proposalData.id);
    if (!proposal) {
      throw new Error("Proposal with this id not found");
    }
    return await this.update(proposalData);
  }

  async createProposal(proposalData: any) {
    if (!proposalData.leadId) {
      throw new Error("leadId is required");
    }
    const existingProposal = await this.getByLeadId(proposalData.leadId);
    if (existingProposal) {
      throw new Error("Proposal on this lead id already exists");
    } else {
      const userOrganisation =
        await this.userOrganisationRepository.findByUserId(proposalData.userId);
      if (!userOrganisation) {
        throw new Error("user not found");
      }
      proposalData.organisationId = userOrganisation.organisationId;
      return await this.create(proposalData);
    }
  }
}
