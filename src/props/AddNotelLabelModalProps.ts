import { UserClass } from '../classes/UserClass';
import { LabelInterface } from '../interfaces/LabelInterface';

export interface AddNoteLabelModalProps {
  availableLabels: LabelInterface[] | undefined;
  noteLabels: LabelInterface[];
  user: UserClass | undefined;
  openAddNoteLabelModal: boolean;
  closeAddNoteLabelModal: () => void;
}
