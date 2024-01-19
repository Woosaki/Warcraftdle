import "../assets/styles/Footer.css";
import githubSVG from "../assets/images/github.svg";
import coffeeSVG from "../assets/images/coffee.svg";
import infoSVG from "../assets/images/info.svg";
import ExternalLink from "../components/ExternalLink";
import ColoredImage from "../components/ColoredImage";

const Footer = () => (
  <footer>
    <div className="useful-links">
      <ColoredImage
        href="https://github.com/Woosaki/Warcraftdle"
        src={githubSVG}
        alt="Github Image"
        backgroundColor="#000"
      />
      <ColoredImage
        href="https://ko-fi.com/woosaki"
        src={coffeeSVG}
        alt="Coffee Image"
        backgroundColor="#ace4aa"
      />
      <ColoredImage
        href="https://www.wp.pl/"
        src={infoSVG}
        alt="Info Image"
        backgroundColor="#fcc41c"
      />
    </div>
    <p>Kamil Szczukowski, 186714</p>
    <p className="inspired">
      Inspired by <ExternalLink href="https://loldle.net/">Loldle</ExternalLink>{" "}
      and{" "}
      <ExternalLink href="https://www.nytimes.com/games/wordle/index.html">
        Wordle
      </ExternalLink>
    </p>
  </footer>
);

export default Footer;
