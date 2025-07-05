import { LeadMessageService } from "../services/leadMessage.service";

const leadMessageService = new LeadMessageService();

export const addLeadMessage = async (req: any, res: any, next: any) => {
  try {
    const userId = req.user.id;
    const { leadId, message } = req.body;
    const leadMessageData = await leadMessageService.addMessage({
      userId,
      leadId,
      message,
    });
    return res.json(leadMessageData);
  } catch (err) {
    next(err);
  }
};

export const getAllLeadMessagesByLeadId = async (req: any, res: any, next: any) => {
  try {
    const { leadId } = req.body;
    const leadMessages = await leadMessageService.getByLeadId(leadId);
    return res.json(leadMessages);
  } catch (err) {
    next(err);
  }
};
