import { MouseEventHandler } from 'react';
import { Note } from '../interfaces/Note';
import { Notification } from '../interfaces/Notification';
import { User } from '../interfaces/User';

export interface DraggableNotesProps {
  note: Note;
  deleteNote: MouseEventHandler<HTMLButtonElement> | undefined;
  archiveNote: MouseEventHandler<HTMLButtonElement> | undefined;
  editNote: MouseEventHandler<HTMLButtonElement> | undefined;
  addNotification: (notification: Notification) => void;
  setPinned: (id: string) => void;
  user: User | undefined;
}
