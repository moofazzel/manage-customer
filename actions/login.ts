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
      redirect: false,
    });

    if (response && !response.error) {
      await User.findOne({ email: formData.email });
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response?.error || "লগইনের সময় একটি ত্রুটি ঘটেছে",
      };
    }
  } catch (error: any) {
    console.log("🚀 ~ error:", error);
    return {
      success: false,
      message: error.message || "লগইনের সময় একটি ত্রুটি ঘটেছে",
    };
  }
}
