import bcrypt from "bcrypt";
import { UserService } from "../services/user.service";

const userService = new UserService();

//---------------------------update password------------------------
export const updatePassword = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { oldPassword, password } = req.body;
    const user = await userService.getUserById(id);
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await userService.updatePassword({ id, password: hashedPassword });
    return res.json({
      message: "Password updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

//-----------------------get profile------------------------
export const getProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User Profile not found" });
    }
    return res.json({
      id: user.id,
      emailId: user.emailId,
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      state: user.state,
      country: user.country,
      contact: user.contact,
    });
  } catch (err) {
    next(err);
  }
};

//---------------------------update profile------------------------------
export const updateProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { firstName, lastName, country, state, city, contactNumber } =
      req.body;
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User Profile not found" });
    }
    await userService.updateProfile({
      id,
      firstName,
      lastName,
      country,
      state,
      city,
      contact: contactNumber,
    });
    return res.json({ message: "profile updated successfully" });
  } catch (err) {
    next(err);
  }
};
