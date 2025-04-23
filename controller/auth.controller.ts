import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserService } from "../services/user.service";
import { UserOrganisationService } from "../services/userOrganisation.service";

const userService = new UserService();
const userOrganisationService = new UserOrganisationService();
const SECRET_KEY = process.env.JWT_SECRET || "abcdefghi";

//--------------------------signup-----------------------
export const signup = async (req, res, next) => {
  try {
    const { emailId, password } = req.body;
    const user = await userService.signup({ emailId, password });
    const token = jwt.sign({ id: user.id, email: user.emailId }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ message: "User created successfully", token });
  } catch (err: any) {
    if (err.message === "Email already exists") {
      return res.status(400).json({ message: "Email already exists" });
    }
    next(err);
  }
};

//-------------------------------------login---------------------------
export const login = async (req, res, next) => {
  try {
    const { emailId, password } = req.body;
    const user = await userService.getUserByEmail(emailId);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: user.id, email: user.emailId }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.json({ token });
  } catch (err) {
    next(err);
  }
};

//------------------------------signup using referral---------------------
export const createUserOrganisation = async (req, res, next) => {
  try {
    const { referralId, roleId, emailId, password } = req.body;
    const userOrganisationProfile =
      await userOrganisationService.createUserOrganisation({
        referralId,
        roleId,
        emailId,
        password,
      });
    const token = jwt.sign(
      { id: userOrganisationProfile.userId, email: emailId },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.json({ token });
  } catch (err: any) {
    if (err.message === "Organisation Profile not found") {
      return res.status(400).json({ message: "invalid referralId" });
    }
    next(err);
  }
};
