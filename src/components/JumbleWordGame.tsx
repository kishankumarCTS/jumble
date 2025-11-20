import { useState } from "react";
// Import styles as an object 'styles'
import styles from "./JumbleWordsGame.module.css";
import { FaEye } from "react-icons/fa";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

// Utility to shuffle a word
const shuffle = (word: string) => {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

export default function JumbleWordGame() {
  const [jsonInput, setJsonInput] = useState("");
  const [words, setWords] = useState([]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (
        !Array.isArray(parsed as string[]) ||
        !parsed.every((item: string) => typeof item === "string")
      ) {
        throw new Error("Data is not an array of strings.");
      }
      setWords(parsed);
      setGameStarted(true);
      setIndex(0);
      setShowAnswer(false);
    } catch (e) {
      alert(
        'Oops! Invalid JSON or format. Please use an array of words like: ["word", "game", "play"]'
      );
    }
  };

  const next = () => {
    if (index < words.length - 1) {
      setIndex(index + 1);
      setShowAnswer(false);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
      setShowAnswer(false);
    }
  };

  const currentJumbledWord = words.length > 0 ? shuffle(words[index]) : "";
  const currentAnswer = words.length > 0 ? words[index] : "";

  return (
    // Accessing class names via the imported 'styles' object
    <div className={styles.gameContainer}>
      {!gameStarted && (
        <div className={styles.setupPanel}>
          <h1 className={styles.titleSign}>JUMBLE WORD ADVENTURE! 🧩</h1>
          <textarea
            className={styles.inputField}
            placeholder='Enter JSON like ["word", "game", "play"]'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
          <button
            onClick={startGame}
            className={`${styles.startButton} ${styles.questGlow}`}
          >
            START QUEST! 🚀
          </button>
        </div>
      )}

      {gameStarted && (
        <div className={styles.gameBoard}>
          <div className={styles.progressBarContainer}>
            <span className={styles.progressText}>
              Word **{index + 1} / {words.length}**
            </span>
          </div>

          <div
            className={`${styles.wordDisplayBubble} ${
              showAnswer ? styles.answerReveal : styles.jumblePulse
            }`}
          >
            <span className={styles.wordText}>
              {showAnswer ? currentAnswer : currentJumbledWord}
            </span>
            {showAnswer && <span className={styles.revealEmoji}>✨</span>}
            {!showAnswer && <span className={styles.jumbleEmoji}>❓</span>}
          </div>

          <div className={styles.controlsRow}>
            <button
              className={`${styles.controlButton} ${styles.prevButton}`}
              onClick={prev}
              disabled={index === 0}
            >
              <GrFormPrevious size={28} /> Prev
            </button>

            <button
              className={`${styles.controlButton} ${styles.revealButton} ${styles.secretGlow}`}
              onClick={() => setShowAnswer(true)}
            >
              <FaEye size={28} /> Show Secret!
            </button>

            <button
              className={`${styles.controlButton} ${styles.nextButton}`}
              onClick={next}
              disabled={index === words.length - 1}
            >
              Next <GrFormNext size={28} />
            </button>
          </div>

          {index === words.length - 1 && (
            <div className={styles.completionMessage}>
              **You completed the quest!** 🎉
            </div>
          )}
        </div>
      )}
    </div>
  );
}
