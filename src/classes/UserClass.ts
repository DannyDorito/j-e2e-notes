import { version as uuidVersion, validate as uuidValidate, NIL as NIL_UUID } from 'uuid';
import { LabelInterface } from './LabelInterface';
import { OptionsInterface } from './OptionsInterface';
import { GenerateKeys } from '../helpers/SecureContent';

export class UserClass {
  name: string;
  uuid: string;
  authenticated: boolean;
  labels: LabelInterface[];
  options: OptionsInterface;
  keys: CryptoKeyPair;

  constructor(
    name: string,
    uuid: string,
    authenticated: boolean,
    labels: LabelInterface[],
    options: OptionsInterface,
    keys: CryptoKeyPair,
  ) {
    this.name = name;
    this.uuid = uuid;
    this.authenticated = authenticated;
    this.labels = labels;
    this.options = options;
    this.keys = keys;
  }

  isAuthenticated = () => {
    return this.authenticated && this.isValidUUID;
  };

  isValidUUID = () => {
    return this.uuid !== NIL_UUID && uuidValidate(this.uuid) && uuidVersion(this.uuid) === 4;
  };
}

export const defaultUser = new UserClass(
  '',
  NIL_UUID,
  false,
  [],
  {
    showNotifications: true,
    notificationsDuration: 5000,
  },
  await GenerateKeys(),
);
