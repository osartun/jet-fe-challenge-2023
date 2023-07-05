import React, { useEffect, useRef } from "react";
import { navigate } from "gatsby";

import { letsPlay, on, sendNumber } from "../app/apiClient";
import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { addTurn, setGameOver, setGameState } from "../app/store/turnsSlice";
import Layout from "../components/Layout";
import TurnList from "../components/TurnList";

import * as styles from "./game.module.css";

const GamePage = () => {
  const currentRoom = useAppSelector((state) => state.rooms.current);
  const listOfTurns = useAppSelector((state) => state.turns.list);
  const gameState = useAppSelector((state) => state.turns.gameState);
  const isOver = useAppSelector((state) => state.turns.isOver);
  const dispatch = useAppDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentRoom) {
      navigate('/rooms');
    }
  }, [currentRoom])

  useEffect(() => {
    on("randomNumber", (payload) => {
      dispatch(addTurn(payload));
    });
    on("activateYourTurn", (payload) => {
      dispatch(setGameState(payload.state));
    });
    on("gameOver", (payload) => {
      dispatch(setGameOver(payload.isOver));
    });
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      requestAnimationFrame(() => {
        wrapper.scrollTo(0, wrapper.scrollHeight)
      })
    }
  }, [wrapperRef, listOfTurns, gameState]);

  const onSelectNumber = (selectedNumber: SelectableNumbers) => () => {
    const lastTurn = listOfTurns[listOfTurns.length - 1];
    sendNumber(lastTurn.number, selectedNumber);
  };

  return (
    <Layout title="Game">
      <div className={styles.wrapper} ref={wrapperRef}>
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
            <div>Waiting…</div>
          ) : null}
          {gameState === "play" && !isOver ? (
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
    </Layout>
  );
};

export default GamePage;
