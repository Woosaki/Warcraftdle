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
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    if (input) {
      fetch(
        `https://api.warcraftdle.dsprojects.pl/wowcharacter?startswith=${input}`
      )
        .then((response) => response.json())
        .then((data: Character[]) => setCharacters(data));
    } else {
      setCharacters([]);
    }
  }, [input]);

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
            onClick={() => console.log(characters[0])}
            className="submit-button"
          >
            Submit
          </button>
        </div>
        {input && (
          <div className="characters-list">
            <div style={{ height: "8px" }}></div>
            {characters.length === 0 && (
              <div className="no-character-found">No character found.</div>
            )}
            {characters.length > 0 &&
              characters.map((character) => {
                return (
                  <div key={character.id} className="character">
                    {character.name}
                  </div>
                );
              })}
            <div style={{ height: "8px" }}></div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Classic;
