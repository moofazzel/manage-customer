import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./lib/mongodb";
import { User } from "./model/user-model";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    CredentialsProvider({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (credentials === null) return null;

        await dbConnect();
        const foundUser = await User.findOne({ email: credentials.email });
        if (!foundUser) {
          throw new Error("Incorrect email");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          foundUser.password
        );
        if (!isValidPassword) {
          throw new Error("Incorrect password");
        }

        return foundUser;
      },
    }),
  ],
});
