import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { letsPlay, on, sendNumber } from "../app/apiClient";
import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { addTurn, setGameOver, setGameState } from "../app/store/turnsSlice";

const GamePage = () => {
  const listOfTurns = useAppSelector((state) => state.turns.list);
  const gameState = useAppSelector((state) => state.turns.gameState);
  const isOver = useAppSelector((state) => state.turns.isOver);
  const dispatch = useAppDispatch();

  useEffect(() => {
    on("randomNumber", (payload) => {
      dispatch(addTurn(payload));
    });
    on("activateYourTurn", (payload) => {
      dispatch(setGameState(payload.state));
    });
    on("gameOver", (payload) => {
      dispatch(setGameOver(payload.isOver));
    })
  }, []);

  const onSelectNumber = (selectedNumber: SelectableNumbers) => () => {
    const lastTurn = listOfTurns[listOfTurns.length - 1];
    sendNumber(lastTurn.number, selectedNumber);
  };

  return (
    <Layout title="Game">
      {listOfTurns.length === 0 ? (
        <button onClick={letsPlay}>Let's Play</button>
      ) : null}
      <ul>
        {listOfTurns.map((turn, i) => {
          const prevTurn = listOfTurns[i - 1];
          const prevTurnNumber = Number(prevTurn?.number);

          return (
            <li key={i}>
              {turn.isFirst ? (
                <p>{turn.number}</p>
              ) : (
                <p data-evaluation={turn.isCorrectResult}>
                  ({prevTurnNumber} + {turn.selectedNumber}) / 3 ={" "}
                  {(Number(prevTurnNumber) + turn.selectedNumber) / 3}
                </p>
              )}
              <p>{turn.number}</p>
              <p>{!turn.isFirst && turn.user}</p>
              <p>{!turn.isFirst && turn.selectedNumber}</p>
              <p>{!turn.isFirst && turn.isCorrectResult}</p>
            </li>
          );
        })}
      </ul>
      {gameState === "wait" && listOfTurns.length > 0 ? (
        <div>Waiting…</div>
      ) : null}
      {gameState === 'play' && !isOver ? (
        <div>
          <button onClick={onSelectNumber(-1)}>-1</button>
          <button onClick={onSelectNumber(0)}>0</button>
          <button onClick={onSelectNumber(1)}>1</button>
        </div>
      ) : null}
    </Layout>
  );
};

export default GamePage;
