import { LabelInterface } from '../classes/LabelInterface';
import { UserClass } from '../classes/UserClass';

export interface AddNoteLabelModalProps {
  availableLabels: LabelInterface[];
  noteLabels: LabelInterface[];
  user: UserClass | undefined;
  openAddNoteLabelModal: boolean;
  closeAddNoteLabelModal: () => void;
}
