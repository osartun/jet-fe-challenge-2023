import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { getRooms } from "../app/apiClient";
import { setRooms } from "../app/store/roomsSlice";

import * as styles from "./Rooms.module.css";

const Rooms = () => {
  const rooms = useAppSelector((state) => state.rooms.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getRooms().then((_rooms) => {
      dispatch(setRooms(_rooms));
    });
  }, []);

  const onSelectRoom = (room: Room) => {
    console.log(room);
  };

  return (
    <div>
      <p className={styles.title}>Choose your game room</p>
      <ul className={styles.list}>
        {rooms.map((room, i) => (
          <li className={styles.listItem} key={i}>
            <button className={styles.room} onClick={() => onSelectRoom(room)}>{room.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rooms;
