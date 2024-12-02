import { Link } from "react-router-dom";
import { Button } from "../button";
import Logo from "/logo2.jpg";

function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <Link to="/" className="text-xl font-bold cursor-pointer">
        <img
          src={Logo}
          alt="Logo"
          style={{ height: "50px", width: "auto" }}
          className="rounded-lg"
        />
      </Link>
      <div>
        <Button>Sign In</Button>
      </div>
    </header>
  );
}

export default Header;
