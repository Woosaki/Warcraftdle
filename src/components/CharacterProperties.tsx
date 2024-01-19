import React from "react";
import { Character } from "../types/Character";

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
      {characterProperties.map(([key, value], index) => {
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
          <div key={`${key}-${index}`} className={`property ${propertyClass}`}>
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

export default CharacterProperties;
