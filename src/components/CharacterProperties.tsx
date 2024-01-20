import React from "react";
import { Character } from "../types/Character";
import CharacterProperty from "./CharacterProperty";

interface CharacterPropertiesProps {
  character: Character;
  index: number;
  characterToGuess?: Character;
}

const CharacterProperties: React.FC<CharacterPropertiesProps> = ({
  character,
  characterToGuess,
}) => {
  const excludedProperties = ["id", "photo"];
  const characterProperties = Object.entries(character).filter(
    ([key]) => !excludedProperties.includes(key)
  );

  return (
    <div className="character-properties">
      {characterProperties.map(([key, value], index) => (
        <CharacterProperty
          key={`${key}-${index}`}
          keyName={key}
          value={value}
          characterToGuess={characterToGuess}
        />
      ))}
    </div>
  );
};

export default CharacterProperties;
