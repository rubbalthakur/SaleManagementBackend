import { Router } from "express";
import {
  addLeadMessage,
  getAllLeadMessagesByLeadId,
} from "../controller/leadMessage.controller";
import { validateLeadMessage } from "../validators/leadMessage.validator";
import { handleValidationErrors } from "../middlewares/validation.middleware";

const router = Router();

router.post("/getLeadMessages", getAllLeadMessagesByLeadId);
router.post(
  "/addLeadMessage",
  validateLeadMessage,
  handleValidationErrors,
  addLeadMessage
);

export default router;
