import { UserOrganisationService } from "../services/userOrganisation.service";

const userOrganisationService = new UserOrganisationService();

export const getUserOrganisationByUserId = async (req: any, res: any, next: any) => {
  try {
    const userId = req.user.id;
    const user = await userOrganisationService.getByUserId(userId);
    return res.json(user);
  } catch (err) {
    next(err);
  }
};

export const getAllUserOrganisationForOrganisation = async (req: any, res: any, next: any) => {
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

export const updateUserOrganisation = async (req: any, res: any, next: any) => {
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

export const inviteUser = async (req: any, res: any, next: any) => {
  try {
    const userId = req.user.id;
    const { roleId } = req.body;
    const invitationLink = `http://localhost:3000/addUserOrganisation?referralId=${userId}&roleId=${roleId}`;
    return res.json({ message: "data Updated successfully", invitationLink });
  } catch (err) {
    next(err);
  }
}