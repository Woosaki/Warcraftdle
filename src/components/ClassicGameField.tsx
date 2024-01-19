import PropertyNames from "../components/PropertyNames";
import CharacterProperties from "../components/CharacterProperties";
import Tutorial from "../components/Tutorial";
import { Character } from "../types/Character";

interface ClassicGameFieldProps {
  selectedCharacters: Character[];
  characterToGuess?: Character;
}

const ClassicGameField: React.FC<ClassicGameFieldProps> = ({
  selectedCharacters,
  characterToGuess,
}) => {
  return selectedCharacters.length > 0 ? (
    <>
      <section className="classic-answers">
        <PropertyNames />
        {selectedCharacters.map((character, index) => (
          <CharacterProperties
            key={character.id}
            character={character}
            index={index}
            characterToGuess={characterToGuess}
          />
        ))}
      </section>
      <Tutorial />
    </>
  ) : null;
};

export default ClassicGameField;
