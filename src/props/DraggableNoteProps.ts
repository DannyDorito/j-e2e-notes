import { MouseEventHandler } from 'react';
import { NoteClass } from '../classes/NoteClass';
import { NotificationClass } from '../classes/NotificationClass';
import { UserClass } from '../classes/UserClass';

export interface DraggableNotesProps {
  note: NoteClass;
  deleteNote: MouseEventHandler<HTMLButtonElement> | undefined;
  editNote: MouseEventHandler<HTMLButtonElement> | undefined;
  addNotification: (notification: NotificationClass) => void;
  person: UserClass;
}
