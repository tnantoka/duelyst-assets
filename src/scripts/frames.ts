export const parseFrame = (frame: string) => {
  const [x, y, w, h] = frame
    .replace(/[{}]/g, '')
    .split(',')
    .map((n) => parseInt(n));
  return { x, y, w, h };
};
