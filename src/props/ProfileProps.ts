import { Dispatch, SetStateAction } from 'react';
import { UserClass } from '../classes/UserClass';

export interface ProfileProps {
  user: UserClass;
  setUser: Dispatch<SetStateAction<UserClass>>;
}
