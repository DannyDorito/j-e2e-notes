import { Dispatch, SetStateAction } from 'react';
import { User } from '../interfaces/User';

export interface AddLabelModalProps {
  openLabelModal: boolean;
  closeLabelModal: () => void;
  removeLabel: (id: string) => void;
  user: User | undefined;
  addLabel: () => void;
  newLabelName: string;
  setNewLabelName: Dispatch<SetStateAction<string>>;
  newLabelNameError: string;
}
