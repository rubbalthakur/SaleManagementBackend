import { LeadMessage, User } from "../models";

export class LeadMessageRepository {
  async getById(id: number): Promise<LeadMessage | null> {
    return await LeadMessage.findByPk(id);
  }

  async getByLeadId(leadId: number): Promise<LeadMessage[] | []> {
    return await LeadMessage.findAll({
      where: { leadId },
      include: [
        {
          model: User,
          attributes: ["emailId", "firstName", "lastName"],
        },
      ],
    });
  }

  async create(leadMessageData: Partial<LeadMessage>) {
    return await LeadMessage.create(leadMessageData);
  }
}
