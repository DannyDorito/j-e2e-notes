import { randomColour } from '../helpers/RandomColour';
import { ColourInterface } from './ColourInterface';
import { LabelInterface } from './LabelInterface';
import { PositionInterface } from './PositionInterface';
export class NoteClass {
  title: string;
  content: string;
  id: string;
  deletedAt: string | undefined;
  createdAt: string;
  position: PositionInterface;
  colours: ColourInterface;
  edit: boolean;
  labels: LabelInterface[];

  constructor(
    title: string,
    content: string,
    id: string,
    createdAt: string,
    position: PositionInterface,
    labels: LabelInterface[],
  ) {
    this.title = title;
    this.content = content;
    this.id = id;
    this.createdAt = createdAt;
    this.position = position;
    this.colours = randomColour();
    this.edit = false;
    this.labels = labels;
  }
}
