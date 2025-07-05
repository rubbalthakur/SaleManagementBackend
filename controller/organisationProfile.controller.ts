import { OrganisationProfileService } from "../services/organisationProfile.service";

const organisationProfileService = new OrganisationProfileService();

export const getOrganisationProfile = async (req: any, res: any, next: any) => {
  try {
    const userId = req.user.id;
    const organisationProfile =
      await organisationProfileService.getOrganisationProfileByUserId(userId);
    return res.json(organisationProfile);
  } catch (err) {
    next(err);
  }
};

export const createOrUpdateOrganisationProfile = async (req: any, res: any, next: any) => {
  try {
    const userId = req.user.id;
    const { name, country, state, city } = req.body;
    const organisationProfile =
      await organisationProfileService.createOrUpdateOrganisationProfile({
        userId,
        name,
        country,
        state,
        city,
      });
    console.log(organisationProfile);
    return res.json({ message: "Organisation Profile Updated successfully" });
  } catch (err) {
    next(err);
  }
};
