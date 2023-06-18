import { NIL as NIL_UUID } from 'uuid';
import { LabelInterface } from '../interfaces/LabelInterface';
import { OptionsInterface } from '../interfaces/OptionsInterface';

export class UserClass {
  name: string;
  uuid: string;
  authenticated: boolean;
  labels: LabelInterface[];
  options: OptionsInterface;
  avatar: string;

  constructor(
    name: string,
    uuid: string,
    authenticated: boolean,
    labels: LabelInterface[],
    avatar: string,
    options: OptionsInterface,
  ) {
    this.name = name;
    this.uuid = uuid;
    this.authenticated = authenticated;
    this.labels = labels;
    this.avatar = avatar;
    this.options = options;
  }
}

export const defaultUser = new UserClass('', NIL_UUID, false, [], '', {
  showNotifications: true,
  notificationsDuration: 5000,
});
