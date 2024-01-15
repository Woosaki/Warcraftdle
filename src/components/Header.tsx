import "../assets/styles/Header.css";
import { Link } from "react-router-dom";
import logo from "../assets/images/warcraftdleLogo.png";

const Header = () => (
  <header>
    <Link to="/">
      <img src={logo} alt="Warcraftdle Logo" className="logo" />
    </Link>
  </header>
);

export default Header;
