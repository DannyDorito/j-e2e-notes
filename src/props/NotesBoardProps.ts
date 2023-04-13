import { Dispatch, SetStateAction } from 'react';
import { UserClass } from '../classes/UserClass';
import { NotificationClass } from '../classes/NotificationClass';

export interface NotesBoardProps {
  deauthenticate: () => void;
  user: UserClass;
  setUser: Dispatch<SetStateAction<UserClass>>;
  addNotification: (notification: NotificationClass) => void;
}
