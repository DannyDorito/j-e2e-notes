import { Colour } from './Colour';
import { Label } from './Label';
import { Position } from './Position';

export interface Note {
  title: string;
  content: string;
  id: string;
  deletedAt: string | undefined;
  createdAt: string;
  position: Position;
  colours: Colour;
  edit: boolean;
  labels: Label[];
  pinned: boolean;
  image: string | ArrayBuffer | null;
}
