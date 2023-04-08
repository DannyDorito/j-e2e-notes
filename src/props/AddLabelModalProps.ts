import { Dispatch, SetStateAction } from 'react';
import { UserClass } from '../classes/UserClass';

export interface AddLabelModalProps {
  openLabelModal: boolean;
  closeLabelModal: () => void;
  removeLabel: (id: string) => void;
  person: UserClass;
  addLabel: () => void;
  newLabelName: string;
  setNewLabelName: Dispatch<SetStateAction<string>>;
  newLabelNameError: string;
}
