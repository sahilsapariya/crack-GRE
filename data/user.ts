import { connect } from "@/db/db";
import User from "@/models/userSchema";

export const getUserByEmail = async (email: string) => {
  try {
    await connect();
    const user = await User.findOne({
      email,
    });
    return user;
  } catch (error) {
    return null;
  }
};
