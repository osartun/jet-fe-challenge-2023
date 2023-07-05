type RoomType = "cpu" | "human";

interface Room {
  id: string;
  name: string;
  owner: string;
  type: RoomType;
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

type GameOverPayload = {
  user: "cpu" | string;
  isOver: boolean;
};

type EventListenerSignature = {
  (eventName: "message", listener: (pl: MessagePayload) => void): void;
  (
    eventName: "randomNumber",
    listener: (pl: RandomNumberPayload) => void
  ): void;
  (
    eventName: "activateYourTurn",
    listener: (pl: ActivateYourTurnPayload) => void
  ): void;
  (eventName: "gameOver", listener: (pl: GameOverPayload) => void): void;
};
