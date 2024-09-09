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
      setErrorMessage("Email and password are required.");
      return;
    }

    const rowFormData = { email, password };

    try {
      setLoading(true);
      const response = await credentialLogin(rowFormData);
      if (response?.success) {
        router.push("/");
      } else {
        setErrorMessage("Invalid username or password");
      }
    } catch (error: unknown) {
      // Change 'any' to 'unknown'
      setLoading(false);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An error occurred while logging in.");
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
          <p className="font-bold">Warning</p>
          <p>{errorMessage}</p>
        </div>
      )}

      <Input
        name="email"
        type="email"
        label="Email"
        radius="sm"
        isRequired
        required
      />

      <Input
        name="password"
        type="password"
        label="Password"
        radius="sm"
        isRequired
        required
      />

      <div className="flex justify-center">
        {loading ? (
          <Button isLoading color="primary">
            Loading
          </Button>
        ) : (
          <Button type="submit" size="lg" radius="sm" color="primary">
            Login
          </Button>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
