import { User } from '../interfaces/User';
import { Label } from '../interfaces/Label';

export interface AddNoteLabelModalProps {
  availableLabels: Label[] | undefined;
  noteLabels: Label[];
  user: User | undefined;
  openAddNoteLabelModal: boolean;
  closeAddNoteLabelModal: () => void;
}
