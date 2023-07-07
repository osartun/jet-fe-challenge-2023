/**
 * Wait for n milliseconds.
 * @param ms Number of milliseconds to wait
 * @returns
 */
export const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
