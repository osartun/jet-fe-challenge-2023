import React, { useEffect } from "react";

import { useAppSelector } from "../app/store/hooks";
import GameController from "../app/GameController";

import * as styles from "./Rooms.module.css";

const Rooms = () => {
  const rooms = useAppSelector((state) => state.rooms.list);
  const currentRoom = useAppSelector((state) => state.rooms.current);

  const onSelectRoom = (room: Room) => {
    GameController.joinRoom(room);
  };

  return (
    <div>
      <p className={styles.title}>Choose your game room</p>
      <ul className={styles.list}>
        {rooms.map((room, i) => (
          <li className={styles.listItem} key={i}>
            <button
              className={styles.room}
              aria-current={room.name === currentRoom?.name || undefined}
              onClick={() => onSelectRoom(room)}
            >
              {room.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rooms;
