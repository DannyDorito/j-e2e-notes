import { Dispatch, SetStateAction } from 'react';
import { User } from '../interfaces/User';
import { Notification } from '../interfaces/Notification';

export interface ProfileProps {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  addNotification: (notification: Notification) => void;
}
