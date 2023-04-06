import { randomColour } from '../helpers/RandomColour';
import { ColourInterface } from './ColourInterface';
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

  constructor(
    title: string,
    content: string,
    id: string,
    createdAt: string,
    position: PositionInterface,
  ) {
    this.title = title;
    this.content = content;
    this.id = id;
    this.createdAt = createdAt;
    this.position = position;
    const colour = randomColour();
    this.colours = {
      backgroundColour: colour.backgroundColour,
      accentColour: colour.accentColour,
      isCustom: colour.isCustom,
    };
    this.edit = false;
  }
}
