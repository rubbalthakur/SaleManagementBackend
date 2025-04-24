import { Router } from "express";
import {
  getAllProposalByOrganisation,
  getAllProposalByUser,
  addProposal,
  updateProposal,
} from "../controller/proposal.controller";

const router = Router();
router.post("/getAllProposalForOrganisation", getAllProposalByOrganisation);
router.post("/getAllProposalForUser", getAllProposalByUser);
router.post("/addPropoasal", addProposal);
router.post("/updateProposal", updateProposal);
export default router;
