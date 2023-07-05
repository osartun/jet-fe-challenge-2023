import React from "react";

import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { reset } from "../app/store/gamePlaySlice";
import { letsPlay } from "../app/apiClient";
import WinImg from "../images/win.png";
import LoseImg from "../images/lose.png";

import * as styles from "./GameOverOverlay.module.css";

const GameOverOverlay = () => {
  const username = useAppSelector((state) => state.user.name);
  const gameOver = useAppSelector((state) => state.gamePlay.gameOver);
  const dispatch = useAppDispatch();

  if (!gameOver?.isOver) {
    return null;
  }

  const isWinner = gameOver.user === username;

  const onNewGameClick = () => {
    dispatch(reset());
    letsPlay();
  };

  return (
    <div className={styles.wrapper}>
      {isWinner ? (
        <img src={WinImg} className={styles.winImage} alt="" />
      ) : (
        <img src={LoseImg} className={styles.loseImage} alt="" />
      )}
      <p className={styles.tagline}>{isWinner ? "You won" : "You lose"}</p>
      <button className={styles.button} onClick={onNewGameClick}>
        New Game
      </button>
    </div>
  );
};

export default GameOverOverlay;
