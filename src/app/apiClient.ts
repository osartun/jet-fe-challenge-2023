import { Socket, io } from "socket.io-client";

let socket: Socket | null = null;

export const getRooms = async () => {
  const response = await fetch(
    `${process.env.GATSBY_API_BASE_JSON_SERVER}/rooms`
  );
  return response.json() as Promise<Room[]>;
};

export const getUsers = async (filter?: Partial<User>) => {
  const queryString = new URLSearchParams(filter);
  const response = await fetch(
    `${process.env.GATSBY_API_BASE_JSON_SERVER}/users?${queryString}`
  );
  return response.json() as Promise<User[]>;
};

export const connect = () =>
  new Promise<void>((resolve) => {
    if (socket?.active) {
      return resolve();
    }

    socket = io(`${process.env.GATSBY_API_BASE_WS_SERVER}`, {
      transports: ["websocket"],
      closeOnBeforeunload: true,
    }).once("connect", resolve);

    if (process.env.NODE_ENV !== "development") {
      return;
    }

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
  });

export const emit: EventEmitterSignature = (eventName, ...args: any[]) => {
  if (socket?.active) {
    socket.emit(eventName, ...args);
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
