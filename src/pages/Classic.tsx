import "../assets/styles/Classic.css";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InputField from "../components/InputField";
import ClassicGameField from "../components/ClassicGameField";
import { Character } from "../types/Character";

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
        <ClassicGameField
          selectedCharacters={selectedCharacters}
          characterToGuess={characterToGuess}
        />
      </main>
      <Footer />
    </>
  );
};

export default Classic;
