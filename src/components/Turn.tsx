import React, { FC } from "react";
import { useAppSelector } from "../app/store/hooks";

import CPUPlayerIcon from "../images/player-cpu.png";
import HumanPlayerIcon from "../images/player-human.png";

import * as styles from "./Turn.module.css";

interface Props {
  turn: Turn;
  prevTurn?: Turn;
}

const Turn: FC<Props> = ({ turn, prevTurn }) => {
  const isCurrentUser = useAppSelector(
    (state) => !turn.isFirst && state.user.name === turn.user
  );
  const prevTurnNumber = Number(prevTurn?.number);
  const calculatedResult = turn.isFirst
    ? NaN
    : (prevTurnNumber + turn.selectedNumber) / 3;

  return (
    <div className={styles.root} data-current-user={isCurrentUser}>
      <div>
        {turn.isFirst ? (
          <div className={styles.playerIconPlaceholder} />
        ) : (
          <img
            src={turn.user === "CPU" ? CPUPlayerIcon : HumanPlayerIcon}
            alt={turn.user}
            className={styles.playerIcon}
          />
        )}
      </div>
      <div className={styles.content} data-is-first={turn.isFirst}>
        {!turn.isFirst ? (
          <div className={styles.selectedNumber}>{turn.selectedNumber}</div>
        ) : null}
        {!turn.isFirst ? (
          <p
            className={styles.calculation}
            data-is-correct={turn.isCorrectResult}
          >
            ({prevTurnNumber} + {turn.selectedNumber}) / 3 ={" "}
            {calculatedResult % 1 != 0
              ? calculatedResult.toFixed(4)
              : calculatedResult}
          </p>
        ) : null}
        <p className={styles.number}>{turn.number}</p>
      </div>
    </div>
  );
};

export default Turn;
