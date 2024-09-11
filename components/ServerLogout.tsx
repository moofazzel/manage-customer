import { auth, signOut } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function ServerLogout() {
  const session = await auth();
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
        redirect("/login");
      }}
    >
      {session?.user ? (
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl"
          type="submit"
        >
          Logout
        </button>
      ) : (
        <Link
          href={"/login"}
          className="bg-blue-600  text-white font-bold py-2 px-4 rounded-xl"
          type="button"
        >
          Login
        </Link>
      )}
    </form>
  );
}
