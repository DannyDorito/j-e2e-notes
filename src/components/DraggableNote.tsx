import { MouseEventHandler, useState } from 'react';
import { NoteClass } from '../classes/NoteClass';
import { ColourClass } from '../classes/ColourClass';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import ColourPallet from './ColourPallet';
import Card from '@mui/material/Card/Card';
import Box from '@mui/material/Box/Box';
import IconButton from '@mui/material/IconButton/IconButton';
import TextField from '@mui/material/TextField/TextField';
import FilledInput from '@mui/material/FilledInput';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import InvertColorsTwoToneIcon from '@mui/icons-material/InvertColorsTwoTone';
import InvertColorsOffTwoToneIcon from '@mui/icons-material/InvertColorsOffTwoTone';
import './css/DraggableNote.css';

const DraggableNote = ({
  note,
  deleteNote,
  editNote,
}: {
  note: NoteClass;
  deleteNote: MouseEventHandler<HTMLButtonElement> | undefined;
  editNote: MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  const [currentX, setX] = useState<number>(note.currentX);
  const [currentY, setY] = useState<number>(note.currentY);

  const [title, setTitle] = useState<string>(note.title);
  const [content, setContent] = useState<string>(note.content);

  const [colour, setColour] = useState<ColourClass>(note.colours);
  const [showColourPallet, setShowColourPallet] = useState<boolean>(false);

  const handleStop = (_event: DraggableEvent, dragElement: DraggableData) => {
    setX(dragElement.x);
    setY(dragElement.y);
    note.currentX = currentX;
    note.currentY = currentY;
  };

  const updateTitle = (title: string) => {
    setTitle(title);
    note.title = title;
  };

  const updateContent = (content: string) => {
    setContent(content);
    note.content = content;
  };

  const updateColourPallet = (backgroundColour: string, textColour: string) => {
    const updatedColour = new ColourClass(backgroundColour, textColour);
    setColour(updatedColour);
    note.colours = updatedColour;
  };

  const toggleColourPallet = () => {
    setShowColourPallet(!showColourPallet);
  };

  return (
    <Draggable
      position={{ x: currentX, y: currentY }}
      onStop={handleStop}
      disabled={note.edit || showColourPallet}
    >
      <Card className='draggable-card' style={{ backgroundColor: note.colours.backgroundColour }}>
        <TextField
          value={title}
          variant='standard'
          margin='none'
          multiline={false}
          disabled={!note.edit || showColourPallet}
          fullWidth={true}
          placeholder='Title'
          type='text'
          onChange={(event) => updateTitle(event.target.value)}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: note.colours.textColour,
            },
            WebkitTextFillColor: note.colours.textColour,
          }}
        />
        <FilledInput
          value={content}
          margin='none'
          multiline={true}
          disabled={!note.edit}
          fullWidth={true}
          placeholder='Contents'
          type='text'
          minRows={10}
          onChange={(event) => updateContent(event.target.value)}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: note.colours.textColour,
              backgroundColor: note.colours.backgroundColour,
            },
            WebkitTextFillColor: note.colours.textColour,
            padding: 0,
            backgroundColor: note.colours.backgroundColour,
          }}
        />
        <Box className='draggable-box' sx={{ marginTop: 1 }}>
          <IconButton
            className='draggable-button'
            onClick={toggleColourPallet}
            sx={{ color: note.colours.textColour }}
          >
            {showColourPallet ? <InvertColorsOffTwoToneIcon /> : <InvertColorsTwoToneIcon />}
          </IconButton>
          <IconButton
            className='draggable-button'
            onClick={editNote}
            sx={{ color: note.colours.textColour }}
          >
            {note.edit ? <SaveTwoToneIcon /> : <EditTwoToneIcon />}
          </IconButton>
          <IconButton
            className='draggable-button'
            onClick={deleteNote}
            sx={{ color: note.colours.textColour }}
          >
            <DeleteForeverTwoToneIcon />
          </IconButton>
        </Box>
        {showColourPallet && (
          <ColourPallet updateColourPallet={updateColourPallet} currentColour={colour} />
        )}
      </Card>
    </Draggable>
  );
};

export default DraggableNote;
