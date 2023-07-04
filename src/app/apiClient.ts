import { Socket, io } from "socket.io-client";

let socket: Socket | null = null;

export const getRooms = async () => {
  const response = await fetch("http://localhost:3004/rooms");
  return response.json() as Promise<Room[]>;
};

export const connect = () => {
  if (socket?.active) {
    return;
  }

  socket = io("ws://localhost:8082", {
    transports: ["websocket"],
    closeOnBeforeunload: true,
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  socket.on("error", (err) => {
    console.error(err);
  });
};

export const login = (username: string) => {
  if (socket?.active) {
    socket.emit("login", { username });
  }
};

export const joinRoom = (
  room: string,
  username: string,
  roomType: RoomType
) => {
  if (socket?.active) {
    socket.emit("joinRoom", { username, room, roomType });
  }
};
