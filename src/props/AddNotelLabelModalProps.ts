import { User } from '../interfaces/User';
import { Note } from '../interfaces/Note';

export interface AddNoteLabelModalProps {
  note: Note;
  user: User;
  openAddNoteLabelModal: boolean;
  closeAddNoteLabelModal: () => void;
}
