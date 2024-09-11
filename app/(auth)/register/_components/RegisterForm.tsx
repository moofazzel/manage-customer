"use client";

import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterForm = () => {
  // const [isAgreed, setIsAgreed] = useState(true);
  // const [isConfirmedPassword, setIsConfirmedPassword] = useState(true);
  // const [passwordVisibility, setPasswordVisibility] = useState({
  //   password: false,
  //   confirmPassword: false,
  // });

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
    // const confirm = formData.get("confirm");

    // if (confirm !== password) {
    //   setIsConfirmedPassword(false);
    //   return;
    // }

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
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  // const toggleVisibility = (field: "password" | "confirmPassword") => {
  //   setPasswordVisibility((prevState) => ({
  //     ...prevState,
  //     [field]: !prevState[field],
  //   }));
  // };

  return (
    <form
      className="bg-white shadow-medium rounded-xl p-5 py-10 space-y-6"
      onSubmit={registerUser}
    >
      {errorMessage && (
        <div className="bg-red-100 border border-red-500 text-black px-4 py-3 rounded-lg text-center">
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
            Loading
          </Button>
        ) : (
          <Button type="submit" size="lg" radius="sm" color="primary">
            Register
          </Button>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;
