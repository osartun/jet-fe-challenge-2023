import React, { useEffect, useState } from "react"
import { navigate } from "gatsby";

import { getRooms } from "../app/apiClient";
import { useAppSelector } from "../app/store/hooks";

const RoomsPage = () => {
  const username = useAppSelector((state) => state.username.value);
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    getRooms().then((_rooms) => {
      console.log(_rooms)
      setRooms(_rooms)
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