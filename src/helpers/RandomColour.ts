import { ColourInterface } from '../classes/ColourInterface';
import { black, white } from './ThemeProvider';

export const ColourList: ColourInterface[] = [
  { backgroundColour: '#E9B44C', accentColour: black, isCustom: false },
  { backgroundColour: '#C6DEA6', accentColour: black, isCustom: false },
  { backgroundColour: '#1E2D24', accentColour: white, isCustom: false },
  { backgroundColour: '#001B2E', accentColour: white, isCustom: false },
  { backgroundColour: '#226F54', accentColour: white, isCustom: false },
  { backgroundColour: '#DA2C38', accentColour: white, isCustom: false },
  { backgroundColour: '#FF8CC6', accentColour: black, isCustom: false },
  { backgroundColour: '#EC9A29', accentColour: black, isCustom: false },
];

export const randomColour = () => {
  const min = Math.ceil(0);
  const max = Math.floor(ColourList.length - 1);
  const seed = Math.floor(Math.random() * (max - min) + min);
  return ColourList[seed];
};
