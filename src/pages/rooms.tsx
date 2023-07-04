import React, { useEffect } from "react"
import { navigate } from "gatsby";

import { getRooms } from "../app/apiClient";
import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { setRooms } from "../app/store/roomsSlice";

const RoomsPage = () => {
  const username = useAppSelector((state) => state.username.value);
  const rooms = useAppSelector((state) => state.rooms.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getRooms().then((_rooms) => {
      dispatch(setRooms(_rooms));
    });
  }, [])

  const onSelectRoom = (room: Room) => {
    navigate('/game')
  }

  return (
    <div>
      Welcome, {username}! Select a room from the list:
      <ul>
        {rooms.map((room, i) => (
          <li key={i}><a onClick={() => onSelectRoom(room)}>{room.name}</a></li>
        ))}
      </ul>
    </div>
  )
}

export default RoomsPage