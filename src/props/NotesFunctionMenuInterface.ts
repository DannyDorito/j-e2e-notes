import { Dispatch, SetStateAction } from 'react';

export interface NotesFunctionMenuInterface {
  addNote: () => void;
  saveNotes: () => void;
  setOpenLabelModal: Dispatch<SetStateAction<boolean>>;
  deauthenticate: () => void;
}
