import { Dispatch, SetStateAction } from 'react';

export interface NotesFunctionMenuProps {
  addNote: () => void;
  setOpenLabelModal: Dispatch<SetStateAction<boolean>>;
  deauthenticate: () => void;
}
