import { LeadTypeService } from "../services/leadType.service";

const leadTypeService = new LeadTypeService();

export const addLeadType = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { leadTypeName } = req.body;
    const leadType = await leadTypeService.createLeadType(userId, leadTypeName);
    return res.json({ message: "lead type created successfully", leadType });
  } catch (err) {
    next(err);
  }
};

export const updateLeadType = async (req, res, next) => {
  try {
    const { id, leadTypeName } = req.body;
    const leadType = await leadTypeService.updateLeadType({ id, leadTypeName });
    return res.json({ message: "lead type updated successfully", leadType });
  } catch (err) {
    next(err);
  }
};

export const getAllLeadTypeByOrganisation = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const organisationProfileWithLeadType =
      await leadTypeService.getAllLeadTypeByOrganisation(userId);
    return res.json(organisationProfileWithLeadType);
  } catch (err) {
    next(err);
  }
};
