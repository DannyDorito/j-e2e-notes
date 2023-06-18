import { Dispatch, SetStateAction } from 'react';
import { ColourInterface } from '../interfaces/ColourInterface';
export interface ColourPalletProps {
  updateColourPallet: (
    primary: string,
    secondary: string,
    accent: string,
    isCustom: boolean,
  ) => void;
  currentColour: ColourInterface;
  showColourPallet: boolean;
  setShowColourPallet: Dispatch<SetStateAction<boolean>>;
}
