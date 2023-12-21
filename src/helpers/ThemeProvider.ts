import { useDarkMode } from 'usehooks-ts';

export const primary = '#EDB458';
export const secondary = '#496547';
export const white = '#fffbff';
export const black = '#1f1f1f';
export const error = '#ba1a1a';

export const backgroundColour = (): string => {
  const { isDarkMode } = useDarkMode();
  return isDarkMode ? black : white;
};

export const invertedBackgroundColour = (): string => {
  const { isDarkMode } = useDarkMode();
  return isDarkMode ? white : black;
};

export const textColour = (): string => {
  const { isDarkMode } = useDarkMode();
  return isDarkMode ? white : black;
};

export const invertedTextColour = (): string => {
  const { isDarkMode } = useDarkMode();
  return isDarkMode ? black : white;
};
