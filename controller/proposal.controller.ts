import { ProposalService } from "../services/proposal.service";

const proposalService = new ProposalService();

export const getAllProposalByOrganisation = async (req: any, res: any, next: any) => {
  try {
    const userId = req.user.id;
    const proposals = await proposalService.getAllByOrganisation(userId);
    return res.json(proposals);
  } catch (err) {
    next(err);
  }
};

export const getAllProposalByUser = async (req: any, res: any, next: any) => {
  try {
    const userId = req.user.id;
    const proposals = await proposalService.getAllByUser(userId);
    return res.json(proposals);
  } catch (err) {
    next(err);
  }
};

export const addProposal = async (req: any, res: any, next: any) => {
  try {
    const userId = req.user.id;
    const { clientId, leadId, cost, status } = req.body;
    const proposal = await proposalService.createProposal({
      userId,
      clientId,
      leadId,
      cost,
      status,
    });
    return res.json(proposal);
  } catch (err) {
    next(err);
  }
};

export const updateProposal = async (req: any, res: any, next: any) => {
  try {
    const { id, clientId, leadId, cost, status } = req.body;
    const proposal = await proposalService.updateProposal({
      id,
      clientId,
      leadId,
      cost,
      status,
    });
    return res.json(proposal);
  } catch (err) {
    next(err);
  }
};
