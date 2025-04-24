import { Router } from "express";
import {
  getAllProposalByOrganisation,
  getAllProposalByUser,
  addProposal,
  updateProposal,
} from "../controller/proposal.controller";
import { validateProposal } from "../validators/proposal.validator";
import { handleValidationErrors } from "../middlewares/validation.middleware";

const router = Router();
router.post(
  "/addProposal",
  validateProposal,
  handleValidationErrors,
  addProposal
);
router.post("/updateProposal", updateProposal);
router.post("/getAllProposalForOrganisation", getAllProposalByOrganisation);
router.post("/getAllProposalForUser", getAllProposalByUser);
export default router;
