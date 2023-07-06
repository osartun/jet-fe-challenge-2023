import React, { useEffect, useState } from "react";

import { useAppSelector } from "../app/store/hooks";
import GameController from "../app/GameController";
import CPUPlayerIcon from "../images/player-cpu.png";
import HumanPlayerIcon from "../images/player-human.png";

import * as styles from "./GameHeader.module.css";

const GameHeader = () => {
  const currentRoom = useAppSelector((state) => state.rooms.current);
  const [opposingPlayer, setOpposingPlayer] = useState("");

  useEffect(() => {
    return GameController.subscribeToOpposingPlayerName(setOpposingPlayer);
  }, []);

  if (!opposingPlayer || !currentRoom) {
    return "Game of Three";
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <img
          className={styles.image}
          src={currentRoom.type === "cpu" ? CPUPlayerIcon : HumanPlayerIcon}
          alt=""
        />
      </div>
      <div className={styles.text}>Playing against {opposingPlayer}</div>
    </div>
  );
};

export default GameHeader;
