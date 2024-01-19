interface TutorialColorProps {
  src: string;
  label: string;
}

const TutorialColor: React.FC<TutorialColorProps> = ({ src, label }) => (
  <div className="tutorial-color">
    <div>
      <img src={src} alt={label} width="30px" />
    </div>
    <div>{label}</div>
  </div>
);

export default TutorialColor;
