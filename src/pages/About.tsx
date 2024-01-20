import "../assets/styles/About.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => (
  <>
    <Header />
    <main>
      <div className="about-container">
        <h1 className="about-title text-shadow">About Warcraftdle</h1>
        <hr className="title-line" />
        <p className="about-p text-shadow">
          Warcraftdle was developed as an academic project, serving as a
          practical application of the concepts and techniques acquired
          throughout my coursework.
        </p>
        <p className="about-p text-shadow">
          The frontend of the application was constructed utilizing React and
          TypeScript, demonstrating the application of modern web development
          techniques such as functional components and hooks.
        </p>
        <p className="about-p text-shadow">
          The backend was engineered using C# and Postgres. The entire
          application was encapsulated into a Docker container and is
          continuously operational on a personal server, managed via Docker
          Compose.
        </p>
        <p className="about-p text-shadow">
          The application was built with performance and accessibility in mind,
          ensuring a smooth user experience on all devices and screen sizes.
        </p>
      </div>
    </main>
    <Footer />
  </>
);

export default About;
