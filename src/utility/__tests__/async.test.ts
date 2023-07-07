import { wait } from "../async";

describe("utility", () => {
  describe("async", () => {
    describe("wait", () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(() => {
        jest.useRealTimers();
      });

      it("awaits the number of milliseconds", async () => {
        let isResolved = false;
        const promise = wait(100).then(() => {
          isResolved = true;
        });
        expect(isResolved).toBe(false);
        jest.advanceTimersByTime(100);
        await promise;
        expect(isResolved).toBe(true);
      });
    });
  });
});
