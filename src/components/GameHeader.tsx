import React, { useEffect, useState } from "react";

import { useAppSelector } from "../app/store/hooks";
import { getUsers, on } from "../app/apiClient";
import CPUPlayerIcon from "../images/player-cpu.png";
import HumanPlayerIcon from "../images/player-human.png";

import * as styles from './GameHeader.module.css';

const GameHeader = () => {
  const username = useAppSelector((state) => state.user.name);
  const currentRoom = useAppSelector((state) => state.rooms.current);
  const [opposingPlayer, setOpposingPlayer] = useState("");

  useEffect(() => {
    if (currentRoom) {
      if (currentRoom.type === "cpu") {
        setOpposingPlayer("the CPU");
        return;
      }
      const fetchOpposingPlayer = async () => {
        try {
          const users = await getUsers({ room: currentRoom.name })
          const player = users.find((user) => user.name !== username)
          if (player) {
            setOpposingPlayer(player.name);
          } else {
            const unmountListener = on('message', () => {
              fetchOpposingPlayer()
              unmountListener();
            })
          }
        } catch (e) {
          console.log(e);
        }
      }
      fetchOpposingPlayer();
    }
  }, [currentRoom]);

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
