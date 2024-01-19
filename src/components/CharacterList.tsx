import { Character } from "../types/Character";

interface CharacterListProps {
  handleOnClick: (characterToAdd?: Character) => void;
  unselectedCharacters: Character[];
}

const CharacterList: React.FC<CharacterListProps> = ({
  handleOnClick,
  unselectedCharacters,
}) => (
  <div className="characters-list">
    <div style={{ height: "8px" }}></div>
    {unselectedCharacters.length > 0 &&
      unselectedCharacters.map((character) => (
        <div
          key={character.id}
          className="character"
          onClick={() => handleOnClick(character)}
        >
          {character.name}
        </div>
      ))}
    {unselectedCharacters.length === 0 && (
      <div className="no-character-found">No character found.</div>
    )}
    <div style={{ height: "8px" }}></div>
  </div>
);

export default CharacterList;
