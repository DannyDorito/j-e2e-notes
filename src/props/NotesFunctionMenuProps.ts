import { Dispatch, SetStateAction } from 'react';

export interface NotesFunctionMenuProps {
  addNote: () => void;
  saveNotes: () => void;
  setOpenLabelModal: Dispatch<SetStateAction<boolean>>;
  deauthenticate: () => void;
}
