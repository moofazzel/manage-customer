import Provider from "@/providers/Provider";

import { auth } from "@/auth";
import Header from "@/components/Navbar";
import dbConnect from "@/lib/mongodb";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gelman",
  description: "Gelman WiFi",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await dbConnect();
  const session = await auth();
  console.log("🚀 ~ session:", session?.user?.email);

  if (!session?.user?.email) redirect("/login");
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <SessionProvider>
            <Header />

            {children}
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
