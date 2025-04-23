import { Router } from "express";
import {
  validateUpdatePassword,
  validateUserProfile,
} from "../validators/user.validator";
import { handleValidationErrors } from "../middlewares/validation.middleware";

import {
  updatePassword,
  getProfile,
  updateProfile,
} from "../controller/user.controller";

const router = Router();

router.post(
  "/updatepassword",
  validateUpdatePassword,
  handleValidationErrors,
  updatePassword
);

router.post("/getprofile", getProfile);
router.post(
  "/profile",
  validateUserProfile,
  handleValidationErrors,
  updateProfile
);

export default router;
