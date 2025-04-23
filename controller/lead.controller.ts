import { LeadService } from "../services/lead.service";

const leadService = new LeadService();

export const createLead = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { employeeId, leadTypeId, leadSourceId, status, description } =
      req.body;
    const lead = await leadService.createLead({
      userId,
      employeeId,
      leadTypeId,
      leadSourceId,
      status,
      description,
    });
    return res.json({ message: "lead added successfully", lead });
  } catch (err) {
    next(err);
  }
};

export const updateLead = async (req, res, next) => {
  try {
    const { id, employeeId, leadTypeId, leadSourceId, status, description } =
      req.body;
    const lead = await leadService.updateLead({
      id,
      userId: employeeId,
      leadTypeId,
      leadSourceId,
      status,
      description,
    });
    return res.json({ message: "lead updated successfully", lead });
  } catch (err) {
    next(err);
  }
};

export const getLeadByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const lead = await leadService.getLeadByUserId(userId);
    return res.json(lead);
  } catch (err) {
    next(err);
  }
};

export const getAllLeadsByOrganisaion = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const leads = await leadService.getLeadsByOrganisation(userId);
    return res.json(leads);
  } catch (err) {
    next(err);
  }
};
