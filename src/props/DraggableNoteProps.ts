import { MouseEventHandler } from 'react';
import { NoteClass } from '../classes/NoteClass';
import { NotificationClass } from '../classes/NotificationClass';

export interface DraggableNotesProps {
  note: NoteClass;
  deleteNote: MouseEventHandler<HTMLButtonElement> | undefined;
  editNote: MouseEventHandler<HTMLButtonElement> | undefined;
  addNotification: (notification: NotificationClass) => void;

}
