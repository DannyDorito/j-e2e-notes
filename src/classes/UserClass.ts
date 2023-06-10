import { NIL as NIL_UUID } from 'uuid';
import { LabelInterface } from './LabelInterface';
import { OptionsInterface } from './OptionsInterface';

export class UserClass {
  name: string;
  uuid: string;
  authenticated: boolean;
  labels: LabelInterface[];
  options: OptionsInterface;

  constructor(
    name: string,
    uuid: string,
    authenticated: boolean,
    labels: LabelInterface[],
    options: OptionsInterface,
  ) {
    this.name = name;
    this.uuid = uuid;
    this.authenticated = authenticated;
    this.labels = labels;
    this.options = options;
  }
}

export const defaultUser = new UserClass('', NIL_UUID, false, [], {
  showNotifications: true,
  notificationsDuration: 5000,
});
