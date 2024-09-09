"use server";

import { signIn } from "@/auth";
import { User } from "@/model/user-model";

export async function credentialLogin(formData: {
  email: string;
  password: string;
}) {
  try {
    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false, // Disable auto redirection
    });

    if (response && !response.error) {
      const user = await User.findOne({ email: formData.email });
      return {
        success: true,
      };
    } else {
      throw new Error(response.error || "Login failed");
    }
  } catch (error: any) {
    console.log("🚀 ~ error:", error);
    return {
      success: false,
      message: error.message || "An error occurred during login",
    };
  }
}
