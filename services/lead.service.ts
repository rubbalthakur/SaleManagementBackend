import { LeadRepository } from "../repository/lead.repository";
import { Lead } from "../models";
import { UserOrganisationRepository } from "../repository/userOrganisation.repository";

export class LeadService {
  private leadRepository = new LeadRepository();
  private userOrganisationRepository = new UserOrganisationRepository();
  async getLeadById(id: number): Promise<Lead | null> {
    return await this.leadRepository.findById(id);
  }

  async getLeadByUserId(userId: number): Promise<Lead[] | []> {
    return await this.leadRepository.findAllByUserId(userId);
  }

  async getLeadsByOrganisation(userId: number) {
    return await this.leadRepository.getLeadsByOrganisation(userId);
  }

  async create(leadData: Partial<Lead>) {
    return await this.leadRepository.create(leadData);
  }

  async update(leadData: Partial<Lead>) {
    return await this.leadRepository.update(leadData);
  }

  async updateLead(leadData: Partial<Lead>) {
    if (leadData.id === undefined) {
      throw new Error("Lead id is required");
    }
    const lead = this.leadRepository.findById(leadData.id);
    if (!lead) {
      throw new Error("Lead not found");
    }
    return await this.update(leadData);
  }

  async createLead(leadData) {
    const {
      userId,
      employeeId,
      leadTypeId,
      leadSourceId,
      description,
      status,
    } = leadData;
    const userOrganisation = await this.userOrganisationRepository.findByUserId(
      userId
    );
    if (!userOrganisation) {
      throw new Error("Organisation Profile not found");
    }
    const organisationId = userOrganisation.organisationId;
    return await this.create({
      userId: employeeId,
      organisationId,
      leadTypeId,
      leadSourceId,
      description,
      status,
    });
  }
}
