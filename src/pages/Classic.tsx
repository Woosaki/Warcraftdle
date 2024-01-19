import "../assets/styles/Classic.css";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import correctCell from "../assets/images/CellBackgroundCorrect.webp";
import partialCell from "../assets/images/CellBackgroundPartial.webp";
import incorrectCell from "../assets/images/CellBackgroundBad.webp";

type Character = {
  id: number;
  name: string;
  photo: string;
  gender: string;
  race: string;
  class: string | null;
  expansions: string[];
  affiliations: string[];
  zones: string[];
};

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
            onClick={() => {
              setInput("");
              setSelectedCharacters([
                unselectedCharacters[0],
                ...selectedCharacters,
              ]);
            }}
            className="submit-button"
            disabled={!input || !unselectedCharacters.length}
          >
            Submit
          </button>
          {input && (
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
            <div className="tutorial-colors">
              <div className="title">Color indicators</div>
              <div className="tutorial-colors-container">
                <div className="tutorial-color">
                  <div>
                    <img src={correctCell} alt="Correct" width="30px" />
                  </div>
                  <div>Correct</div>
                </div>
                <div className="tutorial-color">
                  <div>
                    <img src={partialCell} alt="Partial" width="30px" />
                  </div>
                  <div>Partial</div>
                </div>
                <div className="tutorial-color">
                  <div>
                    <img src={incorrectCell} alt="Incorrect" width="30px" />
                  </div>
                  <div>Incorrect</div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Classic;
