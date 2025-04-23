import { Router } from "express";
import {
  validateRegisterUser,
  validateLoginUser,
} from "../validators/user.validator";
import { validateUserOrganisation } from "../validators/userOrganisation.validator";
import { handleValidationErrors } from "../middlewares/validation.middleware";

import {
  signup,
  login,
  createUserOrganisation,
} from "../controller/auth.controller";

const router = Router();

router.post("/register", validateRegisterUser, handleValidationErrors, signup);

router.post("/signin", validateLoginUser, handleValidationErrors, login);

router.post(
  "/addUserOrganisation",
  validateUserOrganisation,
  handleValidationErrors,
  createUserOrganisation
);

export default router;
