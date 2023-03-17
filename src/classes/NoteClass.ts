import { randomColour } from "../helpers/RandomColour";

export class NoteClass
{
  content: string;
  id: string;
  deleted: boolean;
  deletedAt: string | undefined;
  createdAt: string;
  currentX: number;
  currentY: number;
  backgroundColour: string;
  edit: boolean;

  constructor(
    content: string,
    id: string,
    createdAt: string
  )
  {
    this.content = content;
    this.id = id;
    this.deleted = false;
    this.createdAt = createdAt;
    this.currentX = 0;
    this.currentY = 0;
    this.backgroundColour = randomColour();
    this.edit = false;
  }
}
