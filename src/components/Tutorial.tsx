import TutorialColor from "./TutorialColor";
import correctCell from "../assets/images/CellBackgroundCorrect.webp";
import partialCell from "../assets/images/CellBackgroundPartial.webp";
import incorrectCell from "../assets/images/CellBackgroundBad.webp";

const Tutorial = () => (
  <div className="tutorial-colors">
    <div className="title">Color indicators</div>
    <div className="tutorial-colors-container">
      <TutorialColor src={correctCell} label="Correct" />
      <TutorialColor src={partialCell} label="Partial" />
      <TutorialColor src={incorrectCell} label="Incorrect" />
    </div>
  </div>
);

export default Tutorial;
