import User from "../models/user.js";

export const create = async (data) => {
  const user = await User.create(data);
  const { password, ...userWithoutPassword } = user.toObject(); // Exclude password from the returned user object
  return userWithoutPassword;
};
