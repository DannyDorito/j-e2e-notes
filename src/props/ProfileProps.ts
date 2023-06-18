import { Dispatch, SetStateAction } from 'react';
import { UserClass } from '../classes/UserClass';
import { NotificationClass } from '../classes/NotificationClass';

export interface ProfileProps {
  user: UserClass | undefined;
  setUser: Dispatch<SetStateAction<UserClass | undefined>>;
  addNotification: (notification: NotificationClass) => void;
}
