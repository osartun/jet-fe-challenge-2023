import React, { useEffect, useRef } from "react";
import { navigate } from "gatsby";

import { letsPlay, on, sendNumber } from "../app/apiClient";
import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { addTurn, setGameOver, setGameState } from "../app/store/gamePlaySlice";
import Layout from "../components/Layout";
import TurnList from "../components/TurnList";
import GameOverOverlay from "../components/GameOverOverlay";

import * as styles from "./game.module.css";

const GamePage = () => {
  const currentRoom = useAppSelector((state) => state.rooms.current);
  const listOfTurns = useAppSelector((state) => state.gamePlay.list);
  const gameState = useAppSelector((state) => state.gamePlay.gameState);
  const gameOver = useAppSelector((state) => state.gamePlay.gameOver);
  const dispatch = useAppDispatch();
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentRoom) {
      navigate("/rooms");
    }
  }, [currentRoom]);

  useEffect(() => {
    on("randomNumber", (payload) => {
      dispatch(addTurn(payload));
    });
    on("activateYourTurn", (payload) => {
      dispatch(setGameState(payload.state));
    });
    on("gameOver", (payload) => {
      dispatch(setGameOver(payload));
    });
  }, []);

  useEffect(() => {
    const wrapper = scrollWrapperRef.current;
    if (wrapper) {
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
    sendNumber(lastTurn.number, selectedNumber);
  };

  return (
    <Layout title="Game">
      <div className={styles.wrapper}>
        <div className={styles.scrollWrapper} ref={scrollWrapperRef}>
          <div className={styles.contentWrapper}>
            {listOfTurns.length === 0 ? (
              <div className={styles.letsPlayWrapper}>
                <button className={styles.letsPlayButton} onClick={letsPlay}>
                  Let's Play
                </button>
              </div>
            ) : null}
            <TurnList turns={listOfTurns} />
            {gameState === "wait" && listOfTurns.length > 0 ? (
              <div className={styles.waiting}>Waiting…</div>
            ) : null}
            {gameState === "play" && !gameOver?.isOver ? (
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
