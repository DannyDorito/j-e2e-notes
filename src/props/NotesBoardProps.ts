import { Dispatch, SetStateAction } from 'react';
import { User } from '../interfaces/User';
import { Notification } from '../interfaces/Notification';

export interface NotesBoardProps {
  deauthenticate: () => void;
  user: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  addNotification: (notification: Notification) => void;
}
