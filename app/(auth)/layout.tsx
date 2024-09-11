import Provider from "@/providers/Provider";

import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import Link from "next/link";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gelman",
  description: "Gelman WiFi",
};

import { Protest_Guerrilla } from "next/font/google";

const protest = Protest_Guerrilla({ weight: "400", subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <SessionProvider>
            <nav className="container flex justify-between gap-3 pt-5 pb-14">
              <h2 className={`text-2xl font-bold ${protest.className} `}>
                Gelman WIFI
              </h2>

              <div className="space-x-3 text-md">
                <Link
                  href={"/register"}
                  className="bg-blue-600  text-white font-bold py-2 px-4 rounded-xl"
                  type="submit"
                >
                  Register
                </Link>
                <Link
                  href={"/login"}
                  className="bg-blue-600  text-white font-bold py-2 px-4 rounded-xl"
                  type="button"
                >
                  Login
                </Link>
              </div>
            </nav>
            {children}
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
