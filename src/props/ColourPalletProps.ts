import { ColourInterface } from '../classes/ColourInterface';
export interface ColourPalletProps {
  updateColourPallet: (
    primary: string,
    secondary: string,
    accent: string,
    isCustom: boolean,
  ) => void;
  currentColour: ColourInterface;
}
