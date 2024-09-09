import { User } from "@/model/user-model";

export async function getUserFromDb(email: string, pwHash: string) {
  const user = await User.findOne({ email, pwHash });

  if (!user) {
    return null;
  }

  return user;
}
