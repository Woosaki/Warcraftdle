import "../assets/styles/Home.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => (
  <>
    <Header />
    <main>
      <p>Select a gamemode to get started</p>
      <section className="game-modes">
        <Link to="/classic">Classic 💪</Link>
        <Link to="/quote">Quote 💬</Link>
        <Link to="/">More soon 🏗️</Link>
      </section>
    </main>
    <Footer />
  </>
);

export default Home;
