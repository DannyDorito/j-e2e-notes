import { Label } from './Label';
import { Options } from './Options';
import { Note } from './Note';

export interface User {
  name: string;
  uuid: string;
  labels: Label[];
  options: Options;
  avatar: string;
  notes: Note[];
}
