import { ClientService } from "../services/client.service";

const clientService = new ClientService();

export const addClient = async (req: any, res: any, next: any) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, emailId, city, state, country, contact } =
      req.body;
    const newClient = await clientService.addClient({
      userId,
      firstName,
      lastName,
      emailId,
      city,
      state,
      country,
      contact,
    });
    return res.json({ message: "Client added successfully", newClient });
  } catch (err) {
    next(err);
  }
};

export const getClientById = async (req: any, res: any, next: any) => {
  try {
    const id = req.body;
    const client = await clientService.getById(id);
    if (!client) {
      return res.status(400).json({ message: "client not found" });
    }
    return res.json(client);
  } catch (err) {
    next(err);
  }
};

export const getAllClientsByOrganisation = async (req: any, res: any, next: any) => {
  try {
    const userId = req.user.id;
    const clients = await clientService.getAllByOrganisation(userId);
    return res.json(clients);
  } catch (err) {
    next(err);
  }
};

export const updateClient = async (req: any, res: any, next: any) => {
  try {
    const { id, emailId, firstName, lastName, city, state, country, contact } =
      req.body;
    const updatedClient = await clientService.updateClient({
      id,
      emailId,
      firstName,
      lastName,
      city,
      state,
      country,
      contact,
    });
    return res.json({ message: "Client updated successfully", updatedClient });
  } catch (err) {
    next(err);
  }
};
