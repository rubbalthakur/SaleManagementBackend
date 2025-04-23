import { LeadSourceService } from "../services/leadSource.service";

const leadSourceService = new LeadSourceService();

export const addLeadSource = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { leadSourceName } = req.body;
    const leadSource = await leadSourceService.createLeadSource(
      userId,
      leadSourceName
    );
    return res.json({
      message: "lead source created successfully",
      leadSource,
    });
  } catch (err) {
    next(err);
  }
};

export const updateLeadSource = async (req, res, next) => {
  try {
    const { id, leadSourceName } = req.body;
    const leadSource = await leadSourceService.updateLeadSource({
      id,
      leadSourceName,
    });
    return res.json({
      message: "lead source updated successfully",
      leadSource,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllLeadSourceByOrganisation = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const organisationProfileWithLeadSource =
      await leadSourceService.getAllLeadSourceByOrganisation(userId);
    return res.json(organisationProfileWithLeadSource);
  } catch (err) {
    next(err);
  }
};
