import { Character } from "../types/Character";

interface CharacterListProps {
  input: string;
  setInput: (input: string) => void;
  unselectedCharacters: Character[];
  selectedCharacters: Character[];
  setSelectedCharacters: (characters: Character[]) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({
  input,
  setInput,
  unselectedCharacters,
  selectedCharacters,
  setSelectedCharacters,
}) =>
  input && (
    <div className="characters-list">
      <div style={{ height: "8px" }}></div>
      {unselectedCharacters.length > 0 &&
        unselectedCharacters.map((character) => (
          <div
            key={character.id}
            className="character"
            onClick={() => {
              setInput("");
              setSelectedCharacters([character, ...selectedCharacters]);
            }}
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
