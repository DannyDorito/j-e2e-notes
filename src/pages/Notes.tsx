import { useEffect, useState } from 'react';
import { NoteClass } from '../classes/NoteClass';
import { v4 as uuidv4 } from 'uuid';
import { testNotes } from '../helpers/TestHelper';
import DraggableNote from '../components/DraggableNote';
import Box from '@mui/material/Box/Box';
import IconButton from '@mui/material/IconButton/IconButton';
import Snackbar from '@mui/material/Snackbar/Snackbar';
import Alert from '@mui/material/Alert/Alert';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import './css/Notes.css';

const Notes = () =>
{
  const [ notes, setNotes ] = useState<NoteClass[]>( testNotes );

  const [ alertOpen, setAlertOpen ] = useState<boolean>( false );
  const [ alertContent, setAlertContent ] = useState<string>( '' );
  const [ alertSeverity, setAlertSeverity ] = useState<'error' | 'warning' | 'info' | 'success'>(
    'info',
  );

  useEffect( () =>
  {
    setAlert( 'Successfully Logged In!', 'success' );
  }, [] );

  const setAlert = ( content: string, severity: 'error' | 'warning' | 'info' | 'success' ) =>
  {
    setAlertOpen( false );
    setAlertContent( content );
    setAlertSeverity( severity );
    setAlertOpen( true );
  };

  const deleteNote = ( id: string ) =>
  {
    setNotes(
      notes.map( ( note ) =>
        note.id === id
          ? {
            ...note,
            deleted: true,
            deletedAt: new Date().toUTCString(),
          }
          : note,
      ),
    );
    setAlert( 'Successfully Deleted Note!', 'success' );
  };

  const editNote = ( id: string ) =>
  {
    setNotes(
      notes.map( ( note ) =>
        note.id === id
          ? {
            ...note,
            edit: !note.edit,
          }
          : note,
      ),
    );
  };

  const addNote = () =>
  {
    setNotes( ( notes ) => [ ...notes, new NoteClass( '', uuidv4(), new Date().toUTCString() ) ] );
    setAlert( 'Successfully Created Note!', 'success' );
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {notes
          .filter( ( note ) => !note.deleted )
          .map( ( note ) => (
            <DraggableNote
              note={note}
              key={note.id}
              deleteNote={() => deleteNote( note.id )}
              editNote={() => editNote( note.id )}
            ></DraggableNote>
          ) )}
        <IconButton
          size={'large'}
          style={{ position: 'fixed', bottom: 0, right: 0 }}
          onClick={addNote}
        >
          <AddCircleTwoToneIcon />
        </IconButton>
        <Snackbar autoHideDuration={5000} open={alertOpen} onClose={() => setAlertOpen( false )}>
          <Alert
            severity={alertSeverity}
            onClose={() => setAlertOpen( false )}
            sx={{ width: '100%' }}
          >
            {alertContent}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default Notes;
