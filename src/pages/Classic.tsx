import "../assets/styles/Classic.css";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

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
        {characterProperties.map(([key, value]) => (
          <div key={key} className="property">
            {Array.isArray(value)
              ? value.map((item, index) => (
                  <div key={index} className="property">
                    {item}
                  </div>
                ))
              : value}
          </div>
        ))}
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
          >
            Submit
          </button>
        </div>
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
      </main>
      <Footer />
    </>
  );
};

export default Classic;
