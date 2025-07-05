import { Router } from "express";
import {
  getUserOrganisationByUserId,
  getAllUserOrganisationForOrganisation,
  updateUserOrganisation,
  inviteUser
} from "../controller/userOrganisation.controller";
import { validateUpdateUserOrganisation } from "../validators/userOrganisation.validator";
import { handleValidationErrors } from "../middlewares/validation.middleware";

const router = Router();

router.post("/getAllUserOrganisation", getAllUserOrganisationForOrganisation);

router.post("/getUserOrganisation", getUserOrganisationByUserId);

router.post(
  "/updateUserOrganisation",
  validateUpdateUserOrganisation,
  handleValidationErrors,
  updateUserOrganisation
);

router.post("/inviteUser", inviteUser)

export default router;
