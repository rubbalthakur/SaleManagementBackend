import { UserOrganisation } from "../models";
import { OrganisationProfileService } from "../services/organisationProfile.service";
import { UserService } from "./user.service";
import { UserOrganisationRepository } from "../repository/userOrganisation.repository";

export class UserOrganisationService {
  private userOrganisationRepository = new UserOrganisationRepository();
  private organisationProfileService = new OrganisationProfileService();
  private userService = new UserService();

  async getAllUserForOrganisation(userId: number) {
    return await this.userOrganisationRepository.getAllBySameOrganisation(
      userId
    );
  }

  async getByUserId(userId: number) {
    return await this.userOrganisationRepository.findByUserId(userId);
  }

  async create(
    userOrganisationData: Partial<UserOrganisation>
  ): Promise<UserOrganisation> {
    return await this.userOrganisationRepository.create(userOrganisationData);
  }

  async update(userOrganisationData: Partial<UserOrganisation>) {
    return await this.userOrganisationRepository.update(userOrganisationData);
  }
  async createUserOrganisation(
    userOrganisationData:any
  ): Promise<UserOrganisation> {
    const organisationProfile =
      await this.organisationProfileService.getOrganisationProfileByUserId(
        userOrganisationData.referralId
      );
    if (!organisationProfile) {
      throw new Error("Organisation Profile not found");
    }
    const organisationId = organisationProfile.id;
    const user = await this.userService.signup({
      emailId: userOrganisationData.emailId,
      password: userOrganisationData.password,
    });
    const userId = user.id;
    return await this.create({
      userId,
      organisationId,
      roleId: userOrganisationData.roleId,
    });
  }

  async updateUserOrganisation(
    userOrganisationData: Partial<UserOrganisation>
  ) {
    if (userOrganisationData.userId === undefined) {
      throw new Error("Employee id is required");
    }
    const userOrganisation = await this.getByUserId(
      userOrganisationData.userId
    );
    if (!userOrganisation) {
      throw new Error("User Organisation not found");
    }
    return await this.update(userOrganisationData);
  }
}
