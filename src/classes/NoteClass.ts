export class NoteClass
{

  content: string;
  id: string;
  deleted: boolean;
  currentX: number;
  currentY: number;

  constructor(
    content: string,
    id: string,
    deleted: boolean
  )
  {
    this.content = content;
    this.id = id;
    this.deleted = deleted;
    this.currentX = 0;
    this.currentY = 0;
  }
}
