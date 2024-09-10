import { model, models, Schema } from "mongoose";

interface IUser {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = models.User ?? model<IUser>("User", userSchema);
