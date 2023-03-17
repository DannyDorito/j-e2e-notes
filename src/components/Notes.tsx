import { useState } from 'react';
import { NoteClass } from '../classes/NoteClass';
import { v4 as uuidv4 } from 'uuid';
import { testNotes } from '../helpers/TestHelper';
import DraggableNote from './DraggableNote';
import Box from '@mui/material/Box/Box';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton/IconButton';
import './css/Notes.css';

const Notes = () => {
  const [notes, setNotes] = useState<NoteClass[]>(testNotes);

  const deleteNote = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              deleted: true,
              deletedAt: new Date().toUTCString(),
            }
          : note,
      ),
    );
  };

  const editNote = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              edit: !note.edit,
            }
          : note,
      ),
    );
  };

  const addNote = () => {
    setNotes((notes) => [...notes, new NoteClass('', uuidv4(), new Date().toUTCString())]);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {notes
        .filter((note) => !note.deleted)
        .map((note) => (
          <DraggableNote
            note={note}
            key={note.id}
            deleteNote={() => deleteNote(note.id)}
            editNote={() => editNote(note.id)}
          ></DraggableNote>
        ))}
      <IconButton
        size={'large'}
        style={{ position: 'fixed', bottom: 0, right: 0 }}
        onClick={addNote}
      >
        <AddCircleOutlineIcon />
      </IconButton>
    </Box>
  );
};

export default Notes;
