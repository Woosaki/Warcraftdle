import "../assets/styles/Classic.css";
import { fetchCharactersStartingWith, fetchRandomCharacter } from "../api/api";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InputField from "../components/InputField";
import ClassicGameField from "../components/ClassicGameField";
import { Character } from "../types/Character";
import WinMessage from "../components/WinMessage";

const Classic = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [unselectedCharacters, setUnselectedCharacters] = useState<Character[]>(
    []
  );
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [characterToGuess, setCharacterToGuess] = useState<Character>();
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    const fetchRandomCharacterData = async () => {
      const character = await fetchRandomCharacter();
      setCharacterToGuess(character);
    };
    fetchRandomCharacterData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();

    const fetchCharactersStartingWithInput = async () => {
      const characters = await fetchCharactersStartingWith(
        input,
        setIsLoading,
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
    const newSelectedCharacters = [
      characterToAdd || unselectedCharacters[0],
      ...selectedCharacters,
    ];
    setSelectedCharacters(newSelectedCharacters);

    if (
      characterToGuess &&
      newSelectedCharacters[0].name === characterToGuess.name
    ) {
      setHasWon(true);
    }
  };

  return (
    <>
      <Header />
      <main className="classic-game">
        {hasWon ? (
          <WinMessage characterName={characterToGuess!.name} />
        ) : (
          <>
            <p className="text-shadow">Guess World of Warcraft character!</p>
            <InputField
              input={input}
              isLoading={isLoading}
              setInput={setInput}
              handleOnClick={handleOnClick}
              unselectedCharacters={unselectedCharacters}
            />
          </>
        )}
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
