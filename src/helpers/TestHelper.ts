import { NoteClass } from "../classes/NoteClass";
import { v4 as uuidv4 } from 'uuid';
import { randomColour } from "./RandomColour";

export const testNotes = (): NoteClass[] =>
{
  return [ {
    content: "hello",
    id: uuidv4(),
    createdAt: new Date().toUTCString(),
    currentX: 0,
    currentY: 0,
    deleted: false,
    deletedAt: undefined,
    backgroundColour: randomColour(),
    edit: false
  },
  {
    content: "hello",
    id: uuidv4(),
    createdAt: new Date().toUTCString(),
    currentX: 0,
    currentY: 0,
    deleted: false,
    deletedAt: undefined,
    backgroundColour: randomColour(),
    edit: false
  },
  {
    content: "hello",
    id: uuidv4(),
    createdAt: new Date().toUTCString(),
    currentX: 0,
    currentY: 0,
    deleted: false,
    deletedAt: undefined,
    backgroundColour: randomColour(),
    edit: false
  },
  {
    content: "hello",
    id: uuidv4(),
    createdAt: new Date().toUTCString(),
    currentX: 0,
    currentY: 0,
    deleted: false,
    deletedAt: undefined,
    backgroundColour: randomColour(),
    edit: false
  },
  {
    content: "hello",
    id: uuidv4(),
    createdAt: new Date().toUTCString(),
    currentX: 0,
    currentY: 0,
    deleted: false,
    deletedAt: undefined,
    backgroundColour: randomColour(),
    edit: false
  },
  {
    content: "hello",
    id: uuidv4(),
    createdAt: new Date().toUTCString(),
    currentX: 0,
    currentY: 0,
    deleted: false,
    deletedAt: undefined,
    backgroundColour: randomColour(),
    edit: false
  },
  {
    content: "hello",
    id: uuidv4(),
    createdAt: new Date().toUTCString(),
    currentX: 0,
    currentY: 0,
    deleted: false,
    deletedAt: undefined,
    backgroundColour: randomColour(),
    edit: false
  },
  {
    content: "hello",
    id: uuidv4(),
    createdAt: new Date().toUTCString(),
    currentX: 0,
    currentY: 0,
    deleted: false,
    deletedAt: undefined,
    backgroundColour: randomColour(),
    edit: false
  } ];
}


