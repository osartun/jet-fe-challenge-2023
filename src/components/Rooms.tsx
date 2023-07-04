import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { getRooms } from "../app/apiClient";
import { setCurrentRoom, setRooms } from "../app/store/roomsSlice";

import * as styles from "./Rooms.module.css";

const Rooms = () => {
  const rooms = useAppSelector((state) => state.rooms.list);
  const currentRoom = useAppSelector((state) => state.rooms.current);
  const username = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getRooms().then((_rooms) => {
      dispatch(setRooms(_rooms));
    });
  }, []);

  const onSelectRoom = (room: Room) => {
    dispatch(setCurrentRoom(room));
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
