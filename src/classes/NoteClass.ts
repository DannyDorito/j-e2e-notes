import { randomColour } from '../helpers/RandomColour';
import { ColourClass } from './ColourClass';

export class NoteClass {
  title: string;
  content: string;
  id: string;
  deleted: boolean;
  deletedAt: string | undefined;
  createdAt: string;
  currentX: number;
  currentY: number;
  colours: ColourClass;
  edit: boolean;

  constructor(
    title: string,
    content: string,
    id: string,
    createdAt: string,
    currentX: number,
    currentY: number,
  ) {
    this.title = title;
    this.content = content;
    this.id = id;
    this.deleted = false;
    this.createdAt = createdAt;
    this.currentX = currentX;
    this.currentY = currentY;
    const colour = randomColour();
    this.colours = new ColourClass(colour.backgroundColour, colour.textColour);
    this.edit = false;
  }
}
