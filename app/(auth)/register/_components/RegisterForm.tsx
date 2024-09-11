"use client";

import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);

    const fullName = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          password: password,
        }),
      });
      setLoading(false);

      router.push("/login");
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("একটি অজানা ত্রুটি ঘটেছে");
      }
    }
  };

  return (
    <form
      className="bg-white shadow-medium rounded-xl p-5 py-10 space-y-6"
      onSubmit={registerUser}
    >
      {errorMessage && (
        <div className="bg-red-100 border border-red-500 text-black px-4 py-3 rounded-lg text-center">
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
          <Button
            isLoading
            color="primary"
            spinner={
              <svg
                className="animate-spin h-5 w-5 text-current"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"
                />
              </svg>
            }
          >
            লোড হচ্ছে
          </Button>
        ) : (
          <Button type="submit" size="lg" radius="sm" color="primary">
            রেজিস্টার করুন
          </Button>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;
