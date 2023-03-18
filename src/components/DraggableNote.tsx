import { MouseEventHandler, useState } from 'react';
import { NoteClass } from '../classes/NoteClass';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import Card from '@mui/material/Card/Card';
import Box from '@mui/material/Box/Box';
import IconButton from '@mui/material/IconButton/IconButton';
import TextField from '@mui/material/TextField/TextField';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import './css/DraggableNote.css';

const DraggableNote = ( {
  note,
  deleteNote,
  editNote,
}: {
  note: NoteClass;
  deleteNote: MouseEventHandler<HTMLButtonElement> | undefined;
  editNote: MouseEventHandler<HTMLButtonElement> | undefined;
} ) =>
{
  const [ currentX, setX ] = useState<number>( note.currentX );
  const [ currentY, setY ] = useState<number>( note.currentY );

  const [ content, setContent ] = useState<string>( note.content );

  const handleStop = ( _event: DraggableEvent, dragElement: DraggableData ) =>
  {
    setX( dragElement.x );
    setY( dragElement.y );
    note.currentX = currentX;
    note.currentY = currentY;
  };

  const updateContent = ( content: string ) =>
  {
    setContent( content );
    note.content = content;
  };

  return (
    <Draggable position={{ x: currentX, y: currentY }} onStop={handleStop} disabled={note.edit}>
      <Card className='draggable-card' style={{ backgroundColor: note.backgroundColour }}>
        <TextField
          value={content}
          variant='standard'
          margin='none'
          multiline={true}
          disabled={!note.edit}
          fullWidth={true}
          placeholder={'New Note'}
          type={'text'}
          onChange={( event ) => updateContent( event.target.value )}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        />
        <Box className='draggable-box'>
          <IconButton className='draggable-button' onClick={editNote}>
            {note.edit ? <SaveIcon /> : <EditIcon />}
          </IconButton>
          <IconButton className='draggable-button' onClick={deleteNote}>
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Box>
      </Card>
    </Draggable>
  );
};

export default DraggableNote;
