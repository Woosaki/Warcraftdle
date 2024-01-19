import { Character } from "../types/Character";

const apiURL = "https://api.warcraftdle.dsprojects.pl";

export const fetchRandomCharacter = async (): Promise<Character> => {
  const response = await fetch(`${apiURL}/wowcharacter/random`);
  const data: Character = await response.json();
  return data;
};

export const fetchCharactersStartingWith = async (
  input: string,
  selectedCharacters: Character[],
  signal: AbortSignal
): Promise<Character[]> => {
  const response = await fetch(`${apiURL}/wowcharacter?startswith=${input}`, {
    signal,
  });
  const data: Character[] = await response.json();
  const unselected = data.filter(
    (character) =>
      !selectedCharacters.find((selected) => selected.id === character.id)
  );
  return unselected;
};
