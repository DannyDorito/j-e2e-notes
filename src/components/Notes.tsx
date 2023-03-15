import { NoteClass } from "../classes/NoteClass";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from "@mui/material/Box/Box";
import TextField from "@mui/material/TextField/TextField";
import DraggableNote from "./DraggableNote";

const Notes = () =>
{
  const Item = styled( Paper )( ( { theme } ) => ( {
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing( 1 ),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minWidth: 300,
    minHeight: 200
  } ) );

  const [ notes, setNotes ] = useState<NoteClass[]>( [ {
    content: "hello",
    id: uuidv4(),
    deleted: false,
    currentX: 0,
    currentY: 0
  },
  {
    content: "hello",
    id: uuidv4(),
    deleted: false,
    currentX: 0,
    currentY: 0
  },
  {
    content: "hello",
    id: uuidv4(),
    deleted: false,
    currentX: 0,
    currentY: 0
  },
  {
    content: "hello",
    id: uuidv4(),
    deleted: false,
    currentX: 0,
    currentY: 0
  },
  {
    content: "hello",
    id: uuidv4(),
    deleted: false,
    currentX: 0,
    currentY: 0
  },
  {
    content: "hello",
    id: uuidv4(),
    deleted: false,
    currentX: 0,
    currentY: 0
  },
  {
    content: "hello",
    id: uuidv4(),
    deleted: false,
    currentX: 0,
    currentY: 0
  },
  {
    content: "hello",
    id: uuidv4(),
    deleted: false,
    currentX: 0,
    currentY: 0
  } ] );

  const [ newNoteText, setNewNoteText ] = useState<string>( "" );
  const [ newNoteHasError, setNewNoteHasError ] = useState<boolean>( false );

  const addNote = () =>
  {
    if ( !!newNoteText )
    {
      setNewNoteHasError( false );
      setNotes( notes => [ ...notes, new NoteClass( newNoteText, uuidv4(), false ) ] );
      setNewNoteText( "" );
    }
    else
    {
      setNewNoteHasError( true );
    }
  }

  const updateNote = ( text: string ) =>
  {
    setNewNoteText( text );
    setNewNoteHasError( !text );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {notes.filter( ( note ) => !note.deleted ).map( ( note, index ) => (
        <DraggableNote note={note} key={note.id}></DraggableNote>
      ) )
      }
    </Box>
  );
}

export default Notes;
