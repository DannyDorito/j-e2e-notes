import { version as uuidVersion, validate as uuidValidate, NIL as NIL_UUID } from 'uuid';
import { LabelInterface } from './LabelInterface';

export class UserClass {
  name: string;
  uuid: string;
  authenticated: boolean;
  labels: LabelInterface[];

  constructor(name: string, uuid: string, authenticated: boolean, labels: LabelInterface[]) {
    this.name = name;
    this.uuid = uuid;
    this.authenticated = authenticated;
    this.labels = labels;
  }

  isAuthenticated = () => {
    return this.authenticated && this.isValidUUID;
  };

  isValidUUID = () => {
    return this.uuid !== NIL_UUID && uuidValidate(this.uuid) && uuidVersion(this.uuid) === 4;
  };
}
