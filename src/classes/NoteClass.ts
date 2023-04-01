import { randomColour } from '../helpers/RandomColour';

export class NoteClass {
  content: string;
  id: string;
  deleted: boolean;
  deletedAt: string | undefined;
  createdAt: string;
  currentX: number;
  currentY: number;
  backgroundColour: string;
  textColour: string;
  edit: boolean;

  constructor(content: string, id: string, createdAt: string, currentX: number, currentY: number) {
    this.content = content;
    this.id = id;
    this.deleted = false;
    this.createdAt = createdAt;
    this.currentX = currentX;
    this.currentY = currentY;
    const colour = randomColour();
    this.backgroundColour = colour.backgroundColour;
    this.textColour = colour.textColour;
    this.edit = false;
  }
}
