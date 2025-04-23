import { Router } from "express";
import { validateClient } from "../validators/client.validator";
import { handleValidationErrors } from "../middlewares/validation.middleware";
import {
  addClient,
  getClientById,
  updateClient,
  getAllClientsByOrganisation,
} from "../controller/client.controller";

const router = Router();

router.post("/getClientById", getClientById);
router.post("/getAllClientsByOrganisation", getAllClientsByOrganisation);
router.post("/addClient", validateClient, handleValidationErrors, addClient);
router.post(
  "/updateClient",
  validateClient,
  handleValidationErrors,
  updateClient
);

export default router;
