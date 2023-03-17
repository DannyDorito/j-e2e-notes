const seed = 16777215;

export const randomColour = (): string => {
  return '#' + Math.floor(Math.random() * seed).toString(16);
};
