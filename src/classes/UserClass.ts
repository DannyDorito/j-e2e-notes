import { version as uuidVersion, validate as uuidValidate, NIL as NIL_UUID } from 'uuid';

export class UserClass {
  name: string;
  uuid: string;
  authenticated: boolean;

  constructor(name: string, uuid: string, authenticated: boolean) {
    this.name = name;
    this.uuid = uuid;
    this.authenticated = authenticated;
  }

  isAuthenticated = () => {
    return this.authenticated && this.isValidUUID;
  };

  isValidUUID = () => {
    return this.uuid !== NIL_UUID && uuidValidate(this.uuid) && uuidVersion(this.uuid) === 4;
  };
}
