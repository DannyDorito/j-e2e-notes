import { ColourClass } from '../classes/ColourClass';
import { black, white } from './ThemeProvider';

export const ColourList: ColourClass[] = [
  { backgroundColour: '#E9B44C', textColour: black },
  { backgroundColour: '#C6DEA6', textColour: black },
  { backgroundColour: '#1E2D24', textColour: white },
  { backgroundColour: '#001B2E', textColour: white },
  { backgroundColour: '#226F54', textColour: white },
  { backgroundColour: '#DA2C38', textColour: white },
  { backgroundColour: '#FF8CC6', textColour: black },
  { backgroundColour: '#EC9A29', textColour: black },
];

export const randomColour = () => {
  const min = Math.ceil(0);
  const max = Math.floor(ColourList.length - 1);
  const seed = Math.floor(Math.random() * (max - min) + min);
  return ColourList[seed];
};
