const WinMessage = () => (
  <div className="win-message">
    <h1 className="text-shadow">CONGRATULATIONS!</h1>
    <p className="text-shadow">You've correctly guessed the character!</p>
    <button onClick={() => window.location.reload()}>Play Again</button>
  </div>
);

export default WinMessage;
