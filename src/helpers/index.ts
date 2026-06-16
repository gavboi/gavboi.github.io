export const navigateTo = (path: string) => {
  window.location.href = `${window.location.pathname.replace(/\/$/, '')}/${path}`;
}

export const randomFromArray = (array: Array<any>) => {
  const len = array.length;
  const randomIndex = Math.floor(Math.random() * len);
  return array[randomIndex];
}

/**
 * Generates a random integer between min and max, inclusive.
 * 
 * @param min Smallest possible value (inclusive)
 * @param max Largest possible value (inclusive)
 * @returns Random integer between min and max
 */
export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}