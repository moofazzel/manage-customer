"use client";

import { credentialLogin } from "@/actions/login";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    setErrorMessage(null);
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    if (!email || !password) {
      setErrorMessage("ইমেইল এবং পাসওয়ার্ড প্রয়োজন।");
      return;
    }

    const rowFormData = { email, password };

    try {
      setLoading(true);
      const response = await credentialLogin(rowFormData);
      if (response?.success) {
        router.push("/");
      } else {
        setErrorMessage("অবৈধ ইমেইল বা পাসওয়ার্ড।");
      }
    } catch (error: unknown) {
      // Change 'any' to 'unknown'
      setLoading(false);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("লগইন করার সময় একটি ত্রুটি ঘটেছে।");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="p-5 py-10 space-y-6 bg-white shadow-medium rounded-xl"
      onSubmit={loginUser}
    >
      {errorMessage && (
        <div className="px-4 py-3 text-center text-black bg-red-100 border border-red-500 rounded-lg">
          <p className="font-bold">সতর্কতা</p>
          <p>{errorMessage}</p>
        </div>
      )}

      <Input
        name="email"
        type="email"
        label="ইমেইল"
        radius="sm"
        isRequired
        required
      />

      <Input
        name="password"
        type="password"
        label="পাসওয়ার্ড"
        radius="sm"
        isRequired
        required
      />

      <div className="flex justify-center">
        {loading ? (
          <Button isLoading color="primary">
            লোড হচ্ছে
          </Button>
        ) : (
          <Button type="submit" size="lg" radius="sm" color="primary">
            লগইন করুন
          </Button>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
