import { wait } from "../utility/async";

import { connect, emit, getRooms, getUsers, on } from "./apiClient";
import store from "./store";
import {
  addTurn,
  reset,
  setGameOver,
  setGameState,
} from "./store/gamePlaySlice";
import { setIsConnected } from "./store/onlineSlice";
import { setCurrentRoom, setRooms } from "./store/roomsSlice";

/**
 * This module initializes the API Client and handles all API calls. It also translates incoming
 * events into the global store.
 */
class GameController {
  listeners: EventListenerUnmountFn[] = [];

  init = async () => {
    await connect();

    store.dispatch(setIsConnected(true));

    this.loadRooms();

    this.listeners = [
      on("onReady", ({ state }) => {
        store.dispatch(setGameState(state ? "play" : "wait"));
      }),
      on("randomNumber", (payload) => {
        store.dispatch(addTurn(payload));
      }),
      on("activateYourTurn", (payload) => {
        store.dispatch(setGameState(payload.state));
      }),
      on("gameOver", (payload) => {
        store.dispatch(setGameOver(payload));
      }),
    ];

    window.addEventListener("beforeunload", this.teardown);
  };

  teardown = () => {
    this.listeners.forEach((unsubscribe) => {
      unsubscribe();
    });
  };

  login = (username: string) => {
    emit("login", { username });
  };

  letsPlay = () => {
    emit("letsPlay");
  };

  sendNumber = (number: string, selectedNumber: SelectableNumbers) => {
    emit("sendNumber", { number, selectedNumber });
  };

  loadRooms = async () => {
    try {
      const rooms = await getRooms();
      store.dispatch(setRooms(rooms));
    } catch (e) {
      console.log(e);
    }
  };

  subscribeToOpposingPlayerName = (cb: (player: string) => void) => {
    const fetchOpposingPlayer = async () => {
      const currentState = store.getState();
      const room = currentState.rooms.current;
      const username = currentState.user.name;
      if (!room) {
        return cb("");
      }
      if (room.type === "cpu") {
        return cb("the CPU");
      }

      try {
        const users = await getUsers({ room: room.name });
        const player = users.find((user) => user.name !== username);
        cb(player?.name ?? "");
      } catch (e) {
        console.log(e);
      }
    };

    fetchOpposingPlayer();
    const offMessage = on("message", fetchOpposingPlayer);
    const offListTrigger = on("listTrigger", fetchOpposingPlayer);

    return () => {
      offMessage();
      offListTrigger();
    };
  };

  joinRoom = async (newRoom: Room) => {
    const currentState = store.getState();
    if (newRoom.name === currentState.rooms.current?.name) {
      // Already here.
      return;
    }
    if (!currentState.rooms.current) {
      emit("joinRoom", {
        username: currentState.user.name,
        room: newRoom.name,
        roomType: newRoom.type,
      });
      store.dispatch(setCurrentRoom(newRoom));
    }
    emit("leaveRoom");
    store.dispatch(reset());
    // A bit hacky, but wait briefly before joining the next room
    await wait(100);
    emit("joinRoom", {
      username: currentState.user.name,
      room: newRoom.name,
      roomType: newRoom.type,
    });
    store.dispatch(setCurrentRoom(newRoom));
  };
}

export default new GameController();
