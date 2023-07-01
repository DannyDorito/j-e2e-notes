import { Dispatch, SetStateAction } from 'react';
import { User } from '../interfaces/User';
import { Notification } from '../interfaces/Notification';

export interface LoginProps {
  deauthenticate: () => void;
  authenticate: () => void;
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  addNotification: (notification: Notification) => void;
}
