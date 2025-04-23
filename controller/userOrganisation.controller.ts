import { UserOrganisationService } from "../services/userOrganisation.service";

const userOrganisationService = new UserOrganisationService();

export const getUserOrganisationByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await userOrganisationService.getByUserId(userId);
    return res.json(user);
  } catch (err) {
    next(err);
  }
};

export const getAllUserOrganisationForOrganisation = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userData = await userOrganisationService.getAllUserForOrganisation(
      userId
    );
    return res.json(userData);
  } catch (err) {
    next(err);
  }
};

export const updateUserOrganisation = async (req, res, next) => {
  try {
    const { userId, roleId } = req.body;
    const userOrganisation =
      await userOrganisationService.updateUserOrganisation({
        userId: userId,
        roleId,
      });
    return res.json({ message: "data Updated successfully", userOrganisation });
  } catch (err) {
    next(err);
  }
};
