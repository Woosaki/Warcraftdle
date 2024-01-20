interface WinMessageProps {
  characterName: string;
}

const WinMessage: React.FC<WinMessageProps> = ({ characterName }) => (
  <div className="win-message">
    <h1 className="text-shadow">CONGRATULATIONS!</h1>
    <p className="text-shadow">Your guess was correct.</p>
    <p className="text-shadow">
      The character was indeed {`${characterName}`}.
    </p>
    <p>Well done!</p>
    <button onClick={() => window.location.reload()}>Play Again</button>
  </div>
);

export default WinMessage;
