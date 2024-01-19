import "../assets/styles/Classic.css";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Tutorial from "../components/Tutorial";
import { Character } from "../types/Character";
import InputField from "../components/InputField";
import CharacterProperties from "../components/CharacterProperties";

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

  return (
    <>
      <Header />
      <main className="classic-game">
        <p className="text-shadow">Guess World of Warcraft character!</p>
        <InputField
          input={input}
          setInput={setInput}
          handleOnClick={handleOnClick}
          unselectedCharacters={unselectedCharacters}
        />
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
        )}
      </main>
      <Footer />
    </>
  );
};

export default Classic;
