import { Dispatch, SetStateAction } from 'react';
import { UserClass } from '../classes/UserClass';
import { NotificationClass } from '../classes/NotificationClass';

export interface LoginProps {
  deauthenticate: () => void;
  authenticate: () => void;
  user: UserClass | undefined;
  setUser: Dispatch<SetStateAction<UserClass | undefined>>;
  addNotification: (notification: NotificationClass) => void;
}
