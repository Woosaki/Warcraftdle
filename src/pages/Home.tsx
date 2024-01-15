import { Link } from "react-router-dom";
import logo from "../assets/images/warcraftdleLogo.png";
import "../assets/styles/Home.css";

const Home = () => {
  return (
    <>
      <header>
        <Link to="/">
          <img src={logo} alt="Warcraftdle Logo" className="logo" />
        </Link>
      </header>
      <main>
        <p>Select a gamemode to get started</p>
        <section className="game-modes">
          <Link to="/classic">Classic 💪</Link>
          <Link to="/quote">Quote 💬</Link>
          <Link to="/">More under construction 🏗️</Link>
        </section>
      </main>
      <footer>
        <div className="useful-links">
          <a
            href="https://github.com/Woosaki"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a href="https://ko-fi.com/wowdlegame">Donate</a>
          <a href="https://www.wp.pl/">Info</a>
        </div>
        <p>Kamil Szczukowski, 186714</p>
        <p className="inspired">
          Inspired by{" "}
          <a
            href="https://loldle.net/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Loldle
          </a>{" "}
          and{" "}
          <a
            href="https://www.nytimes.com/games/wordle/index.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wordle
          </a>
        </p>
      </footer>
    </>
  );
};

export default Home;
