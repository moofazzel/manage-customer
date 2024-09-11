import { Protest_Guerrilla } from "next/font/google";
import { ServerLogout } from "./ServerLogout";

const protest = Protest_Guerrilla({ weight: "400", subsets: ["latin"] });

function Navbar() {
  return (
    <nav className="container flex justify-between gap-10 pt-5 pb-14">
      <h2 className={`text-3xl font-bold ${protest.className} `}>
        Gelman WIFI
      </h2>

      <ServerLogout />
    </nav>
  );
}

export default Navbar;
