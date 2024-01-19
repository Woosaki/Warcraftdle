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
      <main>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type character name ..."
        />
        {characters.map((character) => (
          <div key={character.id}>
            <h2>{character.name}</h2>
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
};

export default Classic;
