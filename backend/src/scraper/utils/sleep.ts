// src/scraper/utils/sleep.ts

/**
 * Pause execution for a specified number of milliseconds.
 */
export const sleep = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};
