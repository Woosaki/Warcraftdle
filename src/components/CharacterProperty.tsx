import { Character } from "../types/Character";

interface CharacterPropertyProps {
  keyName: string;
  value: string | number | string[] | null;
  characterToGuess?: Character;
}

const CharacterProperty: React.FC<CharacterPropertyProps> = ({
  keyName,
  value,
  characterToGuess,
}) => {
  const MATCHING_PROPERTY = "matching-property";
  const PARTIALLY_MATCHING_PROPERTY = "partially-matching-property";
  const NON_MATCHING_PROPERTY = "non-matching-property";

  const getPropertyClass = (
    key: string,
    value: string | number | string[] | null
  ) => {
    if (!characterToGuess) return NON_MATCHING_PROPERTY;

    if (Array.isArray(value)) {
      return getArrayPropertyClass(key, value);
    }

    return characterToGuess[key as keyof Character] === value
      ? MATCHING_PROPERTY
      : NON_MATCHING_PROPERTY;
  };

  const getArrayPropertyClass = (key: string, value: string[]) => {
    const guessValues = characterToGuess![key as keyof Character] as string[];

    const allMatch =
      value.length === guessValues.length &&
      value.every((v, i) => guessValues[i] === v);
    const someMatch = value.some((v) => guessValues.includes(v));

    if (allMatch) return MATCHING_PROPERTY;
    if (someMatch) return PARTIALLY_MATCHING_PROPERTY;
    return NON_MATCHING_PROPERTY;
  };

  const formatValue = (value: string | number | string[] | null) => {
    if (value === null) {
      return "Null";
    }

    if (Array.isArray(value)) {
      return value
        .map((v, i) => (i < value.length - 1 ? v + ",<br />" : v))
        .join("");
    }

    return value;
  };

  const calculateFontSize = (value: string) => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1200) {
      if (value.length > 25) {
        return "calc(0.5vw + 0.2rem)";
      }
      if (value.length > 10) {
        return "calc(0.5vw + 0.4rem)";
      }
      return "calc(0.4vw + 0.4rem)";
    }

    if (screenWidth > 600 && screenWidth < 1200) {
      if (value.length > 25) {
        return "calc(0.35vw + 0.2rem)";
      }
      if (value.length > 10) {
        return "calc(0.5vw + 0.4rem)";
      }
      return "calc(0.4vw + 0.6rem)";
    }

    if (screenWidth <= 600) {
      if (value.length > 25) {
        return "calc(0.5vw + 0.3rem)";
      }
      if (value.length > 10) {
        return "calc(0.6vw + 0.4rem)";
      }
      return "calc(0.4vw + 0.7rem)";
    }
  };

  const propertyClass = getPropertyClass(keyName, value);
  const formattedValue = formatValue(value) as string;
  const fontSize = calculateFontSize(formattedValue);

  return (
    <div className={`property ${propertyClass}`}>
      <div
        style={{ padding: "0.1rem", fontSize: `${fontSize}` }}
        dangerouslySetInnerHTML={{ __html: formattedValue }}
      />
    </div>
  );
};

export default CharacterProperty;
