import React, { FC } from "react";

import Turn from "./Turn";
import * as styles from './TurnList.module.css'

const TurnList: FC<{ turns: Turn[] }> = ({ turns }) => {
  return (
    <ul className={styles.list}>
      {turns.map((turn, i) => {
        const prevTurn = turns[i - 1];

        return (
          <li className={styles.listItem} key={i}>
            <Turn turn={turn} prevTurn={prevTurn} />
          </li>
        );
      })}
    </ul>
  );
};

export default TurnList;
