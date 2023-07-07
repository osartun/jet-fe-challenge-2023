import GameController from "../GameController";
import * as APIClient from "../apiClient";
import store from "../store";
import { GamePlayState } from "../store/gamePlaySlice";
import { RoomsState } from "../store/roomsSlice";

const baseUserMock: User = {
  id: "__USER_ID__",
  name: "__USERNAME__",
  room: "__ROOM_NAME__",
  roomType: "cpu",
};
const baseOnlineStoreMock = { isConnected: true } as const;
const baseUserStoreMock = { name: "__USERNAME__" } as const;
const baseRoomMock: Room = {
  id: "__ROOM_ID__",
  name: "__ROOM_NAME__",
  owner: "__ROOM_OWNER__",
  type: "cpu",
};
const baseRoomsStoreMock: RoomsState = { list: [], current: baseRoomMock };
const baseGamePlayStoreMock: GamePlayState = {
  gameOver: { isOver: false, user: "" },
  gameState: "play",
  list: [],
};

const baseStoreState = {
  online: baseOnlineStoreMock,
  user: baseUserStoreMock,
  rooms: baseRoomsStoreMock,
  gamePlay: baseGamePlayStoreMock,
} as const;

describe("app", () => {
  describe("GameController", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("subscribeToOpposingPlayerName", () => {
      it("returns the CPU name if current room is not human", async () => {
        jest.spyOn(store, "getState").mockReturnValue({
          ...baseStoreState,
          rooms: {
            ...baseRoomsStoreMock,
            current: {
              ...baseRoomMock,
              type: "cpu",
            },
          },
        });

        const cb = jest.fn();
        const unmount = await GameController.subscribeToOpposingPlayerName(cb);
        unmount();

        expect(unmount).toBeInstanceOf(Function);
        expect(cb).toHaveBeenCalledWith("the CPU");
      });

      it("returns the name of the other player in the room", async () => {
        jest.spyOn(store, "getState").mockReturnValue({
          ...baseStoreState,
          rooms: {
            ...baseRoomsStoreMock,
            current: {
              ...baseRoomMock,
              type: "human",
            },
          },
        });
        jest
          .spyOn(APIClient, "getUsers")
          .mockResolvedValue([
            { ...baseUserMock },
            { ...baseUserMock, name: "__OTHER_PLAYER__" },
          ]);

        const cb = jest.fn();
        const unmount = await GameController.subscribeToOpposingPlayerName(cb);
        unmount();

        expect(cb).toHaveBeenCalledWith("__OTHER_PLAYER__");
      });

      it("reacts to messages sent from the server and updates the username", async () => {
        jest.spyOn(store, "getState").mockReturnValue({
          ...baseStoreState,
          rooms: {
            ...baseRoomsStoreMock,
            current: {
              ...baseRoomMock,
              type: "human",
            },
          },
        });
        jest
          .spyOn(APIClient, "getUsers")
          .mockResolvedValueOnce([{ ...baseUserMock }])
          .mockResolvedValueOnce([
            { ...baseUserMock },
            { ...baseUserMock, name: "__Someone__" },
          ])
          .mockResolvedValueOnce([{ ...baseUserMock }]);
        let triggerFn;
        jest
          .spyOn(APIClient, "on")
          .mockImplementation((_eventName, listener) => {
            triggerFn = listener;
            return () => {};
          });

        const cb = jest.fn();
        const unmount = await GameController.subscribeToOpposingPlayerName(cb);

        expect(cb).toHaveBeenLastCalledWith("");
        expect(triggerFn).toBeInstanceOf(Function);

        // Simulate 'message' event
        await triggerFn!({
          user: "__Someone__",
          message: "has joined the room",
        });

        expect(cb).toHaveBeenLastCalledWith("__Someone__");

        // Simulate 'listTrigger' event
        await triggerFn!(true);

        expect(cb).toHaveBeenLastCalledWith("");

        unmount();
      });
    });

    describe("joinRoom", () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(() => {
        jest.useRealTimers();
      });

      it("emits joinRoom if there is no current room", async () => {
        jest.spyOn(store, "getState").mockReturnValue({
          ...baseStoreState,
          rooms: {
            ...baseRoomsStoreMock,
            current: null,
          },
        });
        jest.spyOn(APIClient, "emit");

        const promise = GameController.joinRoom({ ...baseRoomMock });
        jest.runAllTimers();
        await promise;

        expect(APIClient.emit).toHaveBeenCalledWith("joinRoom", {
          username: "__USERNAME__",
          room: "__ROOM_NAME__",
          roomType: "cpu",
        });
      });

      it("emits leaveRoom and then joinRoom if there is a current room", async () => {
        jest.spyOn(store, "getState").mockReturnValue({
          ...baseStoreState,
          rooms: {
            ...baseRoomsStoreMock,
            current: { ...baseRoomMock },
          },
        });
        jest.spyOn(APIClient, "emit");

        const promise = GameController.joinRoom({
          ...baseRoomMock,
          name: "__NEW_ROOM__",
        });
        jest.runAllTimers();
        await promise;

        expect(APIClient.emit).toHaveBeenCalledWith("leaveRoom");
        expect(APIClient.emit).toHaveBeenCalledWith("joinRoom", {
          username: "__USERNAME__",
          room: "__NEW_ROOM__",
          roomType: "cpu",
        });
      });
    });
  });
});
