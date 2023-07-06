import { Socket, io } from "socket.io-client";

let socket: Socket | null = null;

export const getRooms = async () => {
  const response = await fetch("http://localhost:3004/rooms");
  return response.json() as Promise<Room[]>;
};

export const getUsers = async (filter?: Partial<User>) => {
  const queryString = new URLSearchParams(filter);
  const response = await fetch(`http://localhost:3004/users?${queryString}`);
  return response.json() as Promise<User[]>;
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

  socket.onAny((eventName, ...payload) => {
    console.log(`➡️ Received '${eventName}' event with payload:`, ...payload);
  });

  socket.onAnyOutgoing((eventName, ...payload) => {
    console.log(`⬅️ Sending '${eventName}' event with payload:`, ...payload);
  });
};

export const login = (username: string) => {
  if (socket?.active) {
    socket.emit("login", { username });
  }
};

export const joinRoom = (
  username: string,
  room: string,
  roomType: RoomType
) => {
  if (socket?.active) {
    socket.emit("joinRoom", { username, room, roomType });
  }
};

export const leaveRoom = () => {
  if (socket?.active) {
    socket.emit("leaveRoom");
  }
};

export const letsPlay = () => {
  if (socket?.active) {
    socket.emit("letsPlay");
  }
};

export const sendNumber = (
  number: string,
  selectedNumber: SelectableNumbers
) => {
  if (socket?.active) {
    socket.emit("sendNumber", { number, selectedNumber });
  }
};

export const on: EventListenerSignature = (
  eventName: string,
  listener: (...args: any[]) => void
) => {
  if (socket?.active) {
    socket.on(eventName, listener);

    return () => {
      socket?.off(eventName);
    };
  }
  return () => {};
};
