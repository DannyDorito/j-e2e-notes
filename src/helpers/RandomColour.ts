import { Colour } from '../interfaces/Colour';
import { black, white } from './ThemeProvider';

export const ColourList: Colour[] = [
  { primary: '#E9B44C', secondary: '#e9b54c', accent: black, isCustom: false },
  { primary: '#C6DEA6', secondary: '#afd182', accent: black, isCustom: false },
  { primary: '#4d725e', secondary: '#456252', accent: white, isCustom: false },
  { primary: '#001B2E', secondary: '#122e45', accent: white, isCustom: false },
  { primary: '#226F54', secondary: '#18533a', accent: white, isCustom: false },
  { primary: '#DA2C38', secondary: '#f55258', accent: white, isCustom: false },
  { primary: '#FF8CC6', secondary: '#febadd', accent: black, isCustom: false },
  { primary: '#EC9A29', secondary: '#efb932', accent: black, isCustom: false },
];

export const randomColour = () => {
  const min = Math.ceil(0);
  const max = Math.floor(ColourList.length - 1);
  const seed = Math.floor(Math.random() * (max - min) + min);
  return ColourList[seed];
};
