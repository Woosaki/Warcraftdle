import "../assets/styles/Home.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => (
  <>
    <Header />
    <main className="choose-gamemode">
      <p className="text-shadow">Select a gamemode to get started</p>
      <section className="gamemodes">
        <Link to="/classic" className="text-shadow">
          Classic 💪
        </Link>
        <Link to="/quote" className="text-shadow">
          Quote 💬
        </Link>
        <Link to="/" className="text-shadow">
          More soon 🏗️
        </Link>
      </section>
    </main>
    <Footer />
  </>
);

export default Home;
