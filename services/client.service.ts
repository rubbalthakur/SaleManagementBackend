import { Client } from "../models";
import { ClientRepository } from "../repository/client.repository";
import { UserOrganisationRepository } from "../repository/userOrganisation.repository";

export class ClientService {
  private clientRepository = new ClientRepository();
  private userOrganisationRepository = new UserOrganisationRepository();

  async getById(id: number): Promise<Client | null> {
    return await this.clientRepository.findById(id);
  }

  async getAllByOrganisation(userId: number) {
    return await this.clientRepository.findAllByOrganisation(userId);
  }

  async create(clientData: Partial<Client>): Promise<Client> {
    return await this.clientRepository.create(clientData);
  }

  async update(clientData: Partial<Client>) {
    return await this.clientRepository.update(clientData);
  }

  async addClient(clientData) {
    const userOrganisation = await this.userOrganisationRepository.findByUserId(
      clientData.userId
    );
    if (!userOrganisation) {
      throw new Error("User organisation not found");
    }
    clientData.organisationId = userOrganisation.organisationId;
    return await this.clientRepository.create(clientData);
  }

  async updateClient(clientData: Partial<Client>) {
    if (clientData.id === undefined) {
      throw new Error("Client Id is required");
    }
    const client = await this.getById(clientData.id);
    if (!client) {
      throw new Error("Client with this id not found");
    } else {
      return await this.update(clientData);
    }
  }
}
