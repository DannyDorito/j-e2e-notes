import { MouseEventHandler } from 'react';
import { NoteClass } from '../classes/NoteClass';

export interface DraggableNotesProps {
  note: NoteClass;
  deleteNote: MouseEventHandler<HTMLButtonElement> | undefined;
  editNote: MouseEventHandler<HTMLButtonElement> | undefined;
}
