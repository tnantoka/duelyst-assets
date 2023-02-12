export const parseFrame = (frame: string) => {
  const [x, y, w, h] = parse(frame);
  return { x, y, w, h };
};

export const parseSize = (frame: string) => {
  const [w, h] = parse(frame);
  return { w, h };
};

const parse = (text: string) => {
  return text
    .replace(/[{}]/g, '')
    .split(',')
    .map((n) => parseInt(n));
};
