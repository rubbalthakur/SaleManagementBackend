import { Client, OrganisationProfile, UserOrganisation } from "../models";

export class ClientRepository {
  async findById(id: number): Promise<Client | null> {
    return await Client.findByPk(id);
  }

  async findAllByOrganisation(userId: number) {
    return await UserOrganisation.findOne({
      where: { userId },
      include: [
        {
          model: OrganisationProfile,
          attributes: ["id"],
          include: [
            {
              model: Client,
            },
          ],
        },
      ],
    });
  }

  async create(clientData: Partial<Client>): Promise<Client> {
    return await Client.create(clientData);
  }
  async update(clientData: Partial<Client>) {
    return await Client.update(clientData, { where: { id: clientData.id } });
  }
}
