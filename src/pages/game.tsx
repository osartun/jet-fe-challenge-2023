import React, { useEffect, useRef } from "react";
import { HeadFC, navigate } from "gatsby";

import { useAppSelector } from "../app/store/hooks";
import GameController from "../app/GameController";
import Layout from "../components/Layout";
import GameHeader from "../components/GameHeader";
import TurnList from "../components/TurnList";
import GameOverOverlay from "../components/GameOverOverlay";

import * as styles from "./game.module.css";

const GamePage = () => {
  const currentRoom = useAppSelector((state) => state.rooms.current);
  const listOfTurns = useAppSelector((state) => state.gamePlay.list);
  const gameState = useAppSelector((state) => state.gamePlay.gameState);
  const gameOver = useAppSelector((state) => state.gamePlay.gameOver);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentRoom) {
      navigate("/rooms");
    }
  }, [currentRoom]);

  useEffect(() => {
    const wrapper = scrollWrapperRef.current;
    if (wrapper) {
      // Make sure the viewport is always scrolled to the bottom
      requestAnimationFrame(() => {
        if (window.innerWidth > 640) {
          wrapper.scrollTo(0, wrapper.scrollHeight);
        } else {
          window.scrollTo(0, document.body.scrollHeight);
        }
      });
    }
  }, [scrollWrapperRef, listOfTurns, gameState]);

  const onSelectNumber = (selectedNumber: SelectableNumbers) => () => {
    const lastTurn = listOfTurns[listOfTurns.length - 1];
    GameController.sendNumber(lastTurn.number, selectedNumber);
  };

  return (
    <Layout title={<GameHeader />}>
      <div className={styles.wrapper}>
        <div className={styles.scrollWrapper} ref={scrollWrapperRef}>
          <div className={styles.contentWrapper}>
            {gameState === "play" && listOfTurns.length === 0 ? (
              <div className={styles.letsPlayWrapper}>
                <button
                  className={styles.letsPlayButton}
                  onClick={GameController.letsPlay}
                >
                  Let's Play
                </button>
              </div>
            ) : null}
            <TurnList turns={listOfTurns} />
            {gameState === "wait" && !gameOver?.isOver ? (
              <div className={styles.waiting}>Waiting…</div>
            ) : null}
            {gameState === "play" &&
            listOfTurns.length > 0 &&
            !gameOver?.isOver ? (
              <div className={styles.numberButtonWrapper}>
                <button
                  className={styles.numberButton}
                  onClick={onSelectNumber(-1)}
                >
                  -1
                </button>
                <button
                  className={styles.numberButton}
                  onClick={onSelectNumber(0)}
                >
                  0
                </button>
                <button
                  className={styles.numberButton}
                  onClick={onSelectNumber(1)}
                >
                  1
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <GameOverOverlay />
      </div>
    </Layout>
  );
};

export default GamePage;

export const Head: HeadFC = () => <title>Game of Three</title>;
