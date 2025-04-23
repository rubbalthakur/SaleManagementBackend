import { LeadMessage } from "../models";
import { LeadMessageRepository } from "../repository/leadMessage.repository";

export class LeadMessageService {
  private leadMessageRepository = new LeadMessageRepository();

  async getByLeadId(leadId: number): Promise<LeadMessage[] | []> {
    return await this.leadMessageRepository.getByLeadId(leadId);
  }

  async addMessage(leadMessageData: Partial<LeadMessage>) {
    return await this.leadMessageRepository.create(leadMessageData);
  }
}
