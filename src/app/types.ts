type RoomType = "cpu" | "human";

interface Room {
  id: string;
  name: string;
  owner: string;
  type: RoomType;
}

interface User {
  id: string;
  name: string;
  room: string;
  roomType: "cpu" | "human";
}

type SelectableNumbers = -1 | 0 | 1;

type Turn =
  | {
      number: string;
      isFirst: true;
    }
  | {
      number: string;
      isFirst: false;
      selectedNumber: SelectableNumbers;
      user: "CPU" | string;
      isCorrectResult: boolean;
    };

type GameState = "play" | "wait";

interface GameOver {
  user: "cpu" | string;
  isOver: boolean;
}

type EventEmitterSignature = {
  (eventName: "login", payload: { username: string }): void;
  (
    eventName: "joinRoom",
    payload: {
      username: string;
      room: string;
      roomType: RoomType;
    }
  ): void;
  (eventName: "leaveRoom"): void;
  (eventName: "letsPlay"): void;
  (
    eventName: "sendNumber",
    payload: {
      number: string;
      selectedNumber: SelectableNumbers;
    }
  ): void;
};

type RandomNumberPayload = Turn;

type ActivateYourTurnPayload = {
  user: string;
  state: GameState;
};

type MessagePayload = {
  user: string;
  message: string;
  socketId?: string;
  room?: string;
};

type OnReadyPayload = {
  state: boolean;
};

type GameOverPayload = GameOver;

type EventListenerUnmountFn = () => void;

type EventListenerSignature = {
  (
    eventName: "message",
    listener: (pl: MessagePayload) => void
  ): EventListenerUnmountFn;
  (
    eventName: "onReady",
    listener: (pl: OnReadyPayload) => void
  ): EventListenerUnmountFn;
  (
    eventName: "randomNumber",
    listener: (pl: RandomNumberPayload) => void
  ): EventListenerUnmountFn;
  (
    eventName: "activateYourTurn",
    listener: (pl: ActivateYourTurnPayload) => void
  ): EventListenerUnmountFn;
  (
    eventName: "gameOver",
    listener: (pl: GameOverPayload) => void
  ): EventListenerUnmountFn;
  (
    eventName: "listTrigger",
    listener: (pl: boolean) => void
  ): EventListenerUnmountFn;
};
