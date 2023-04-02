import { MouseEventHandler, useState } from 'react';
import { NoteClass } from '../classes/NoteClass';
import { ColourClass } from '../classes/ColourClass';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import ColourPallet from './ColourPallet';
import Card from '@mui/material/Card/Card';
import Box from '@mui/material/Box/Box';
import IconButton from '@mui/material/IconButton/IconButton';
import TextField from '@mui/material/TextField/TextField';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import ColorLensTwoToneIcon from '@mui/icons-material/ColorLensTwoTone';
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

  const [color, setColour] = useState<ColourClass>(note.colours);
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

  const updateColourPallet = (colour: ColourClass) => {
    setColour(new ColourClass(color.backgroundColour, color.textColour));
    note.colours = colour;
  };

  const toggleColourPallet = () => {
    setShowColourPallet(!showColourPallet);
  };

  return (
    <Draggable position={{ x: currentX, y: currentY }} onStop={handleStop} disabled={note.edit}>
      <Card className='draggable-card' style={{ backgroundColor: note.colours.backgroundColour }}>
        <TextField
          value={title}
          variant='standard'
          margin='none'
          multiline={false}
          disabled={!note.edit}
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
        <TextField
          value={content}
          variant='standard'
          margin='none'
          multiline={true}
          disabled={!note.edit}
          fullWidth={true}
          placeholder='Contents'
          type='text'
          onChange={(event) => updateContent(event.target.value)}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: note.colours.textColour,
            },
            WebkitTextFillColor: note.colours.textColour,
          }}
        />
        <Box className='draggable-box'>
          <IconButton
            className='draggable-button'
            onClick={toggleColourPallet}
            sx={{ color: note.colours.textColour }}
          >
            <ColorLensTwoToneIcon />
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
        {showColourPallet && <ColourPallet updateColourPallet={updateColourPallet} />}
      </Card>
    </Draggable>
  );
};

export default DraggableNote;
