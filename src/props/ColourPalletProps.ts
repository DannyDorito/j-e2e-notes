import { Dispatch, SetStateAction } from 'react';
import { Colour } from '../interfaces/Colour';
export interface ColourPalletProps {
  updateColourPallet: (
    primary: string,
    secondary: string,
    accent: string,
    isCustom: boolean,
  ) => void;
  currentColour: Colour;
  showColourPallet: boolean;
  setShowColourPallet: Dispatch<SetStateAction<boolean>>;
}
