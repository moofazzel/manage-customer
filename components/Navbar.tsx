import { ServerLogout } from "./ServerLogout";

function Navbar() {
  return (
    <nav className="container flex justify-between gap-10 pt-5 pb-14">
      <h2 className="text-3xl font-bold ">Gelman WIFI</h2>

      <ServerLogout />
    </nav>
  );
}

export default Navbar;
