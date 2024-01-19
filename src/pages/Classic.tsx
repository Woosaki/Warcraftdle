import "../assets/styles/Classic.css";
import { fetchCharactersStartingWith, fetchRandomCharacter } from "../api/api";
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
    const fetchRandomCharacterData = async () => {
      const character = await fetchRandomCharacter();
      setCharacterToGuess(character);
    };
    fetchRandomCharacterData();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchCharactersStartingWithInput = async () => {
      const characters = await fetchCharactersStartingWith(
        input,
        selectedCharacters,
        controller.signal
      );
      setUnselectedCharacters(characters);
    };

    if (input) {
      fetchCharactersStartingWithInput();
    } else {
      setUnselectedCharacters([]);
    }

    return () => controller.abort();
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
