import "../assets/styles/Classic.css";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Tutorial from "../components/Tutorial";
import { Character } from "../types/Character";
import CharacterList from "../components/CharacterList";

const Classic = () => {
  const [input, setInput] = useState("");
  const [unselectedCharacters, setUnselectedCharacters] = useState<Character[]>(
    []
  );
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [characterToGuess, setCharacterToGuess] = useState<Character>();

  useEffect(() => {
    fetch(`https://api.warcraftdle.dsprojects.pl/wowcharacter/random`)
      .then((response) => response.json())
      .then((data: Character) => setCharacterToGuess(data));
  }, []);

  useEffect(() => {
    if (input) {
      fetch(
        `https://api.warcraftdle.dsprojects.pl/wowcharacter?startswith=${input}`
      )
        .then((response) => response.json())
        .then((data: Character[]) => {
          const unselected = data.filter(
            (character) =>
              !selectedCharacters.find(
                (selected) => selected.id === character.id
              )
          );
          setUnselectedCharacters(unselected);
        });
    } else {
      setUnselectedCharacters([]);
    }
  }, [input, selectedCharacters]);

  const handleOnClick = (characterToAdd?: Character) => {
    setInput("");
    setSelectedCharacters([
      characterToAdd || unselectedCharacters[0],
      ...selectedCharacters,
    ]);
  };

  const renderCharacterProperties = (character: Character, index: number) => {
    const excludedProperties = ["id", "photo"];
    const characterProperties = Object.entries(character).filter(
      ([key]) => !excludedProperties.includes(key)
    );

    return (
      <div key={index} className="character-properties">
        {characterProperties.map(([key, value]) => {
          let propertyClass = "non-matching-property";
          if (characterToGuess) {
            if (Array.isArray(value)) {
              const guessValue = characterToGuess[key as keyof Character] as
                | string[]
                | null;
              const allMatch =
                value.length === guessValue?.length &&
                value.every((v, i) => guessValue?.[i] === v);
              const someMatch = value.some((v) => guessValue?.includes(v));
              if (allMatch) {
                propertyClass = "matching-property";
              } else if (someMatch) {
                propertyClass = "partially-matching-property";
              }
            } else {
              propertyClass =
                characterToGuess[key as keyof Character] === value
                  ? "matching-property"
                  : "non-matching-property";
            }
          }

          return (
            <div key={key} className={`property ${propertyClass}`}>
              {Array.isArray(value) ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: value
                      .map((v, i) => (i < value.length - 1 ? v + ",<br />" : v))
                      .join(""),
                  }}
                />
              ) : value === null ? (
                "Null"
              ) : (
                value
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Header />
      <main className="classic-game">
        <p className="text-shadow">Guess World of Warcraft character!</p>
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
          {input && (
            <CharacterList
              handleOnClick={handleOnClick}
              unselectedCharacters={unselectedCharacters}
            />
          )}
        </div>
        {selectedCharacters.length > 0 && (
          <>
            <section className="classic-answers">
              <div className="property-names">
                <div className="property-name text-shadow">
                  Name <hr />
                </div>
                <div className="property-name text-shadow">
                  Gender <hr />
                </div>
                <div className="property-name text-shadow">
                  Race <hr />
                </div>
                <div className="property-name text-shadow">
                  Class <hr />
                </div>
                <div className="property-name text-shadow">
                  Expansion(s) <hr />
                </div>
                <div className="property-name text-shadow">
                  Affiliation(s) <hr />
                </div>
                <div className="property-name text-shadow">
                  Zone(s) <hr />
                </div>
              </div>
              {selectedCharacters.map((character, index) =>
                renderCharacterProperties(character, index)
              )}
            </section>
            <Tutorial />
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Classic;
