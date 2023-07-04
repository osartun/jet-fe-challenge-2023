import React, { useEffect, useState } from "react"
import { getRooms } from "../app/apiClient";
import { navigate } from "gatsby";

const RoomsPage = () => {
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
      Welcome! Select a room from the list:
      <ul>
        {rooms.map((room, i) => (
          <li key={i}><a onClick={() => onSelectRoom(room)}>{room.name}</a></li>
        ))}
      </ul>
    </div>
  )
}

export default RoomsPage