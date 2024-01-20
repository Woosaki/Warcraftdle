import { Character } from "../types/Character";
import CharacterList from "./CharacterList";

interface InputFieldProps {
  input: string;
  isLoading: boolean;
  setInput: (input: string) => void;
  handleOnClick: (characterToAdd?: Character) => void;
  unselectedCharacters: Character[];
}

const InputField: React.FC<InputFieldProps> = ({
  input,
  isLoading,
  setInput,
  handleOnClick,
  unselectedCharacters,
}) => (
  <div className="input-container">
    <input
      className="input-field"
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type character name ..."
    />
    <button
      onClick={() => handleOnClick(undefined)}
      className="submit-button"
      disabled={!input || !unselectedCharacters.length}
    >
      Submit
    </button>
    {isLoading
      ? null
      : input && (
          <CharacterList
            handleOnClick={handleOnClick}
            unselectedCharacters={unselectedCharacters}
          />
        )}
  </div>
);

export default InputField;
