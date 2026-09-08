import User from "../models/user.js";
import { NotFoundError } from "../errors/not-found.js";

export const create = async (data) => {
  const user = await User.create(data);
  const { password, ...userWithoutPassword } = user.toObject(); // Exclude password from the returned user object
  return userWithoutPassword;
};

export const index = async () => {
  const users = await User.find({}, { password: 0 });
  return users;
};

export const show = async (id) => {
  const user = await User.findById(id, { password: 0 });
  if (!user) throw new NotFoundError("User not found");
  return user;
};

export const update = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, {
    // new: true, Return the updated document (old behavior has been deprecated)
    returnDocument: "after",
    projection: { password: 0 },
  });

  if (!user) throw new NotFoundError("User not found");

  return user;
};

export const remove = async (id) => {
  const user = await User.findByIdAndDelete(id, {
    projection: { password: 0 },
  });

  if (!user) throw new NotFoundError("User not found");

  return user;
};
