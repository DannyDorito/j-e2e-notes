import { LabelInterface } from '../classes/LabelInterface';
import { UserClass } from '../classes/UserClass';

export interface AddNoteLabelModalProps {
  availableLabels: LabelInterface[];
  noteLabels: LabelInterface[];
  person: UserClass;
  openAddNoteLabelModal: boolean;
  closeAddNoteLabelModal: () => void;
}
