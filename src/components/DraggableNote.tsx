import { MouseEventHandler, Ref, useEffect, useState } from 'react';
import { NoteClass } from '../classes/NoteClass';
import { ColourInterface } from '../classes/ColourInterface';
import { Rnd } from 'react-rnd';
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
import Tooltip from '@mui/material/Tooltip/Tooltip';
import './css/DraggableNote.css';
import { red } from '@mui/material/colors';

const DraggableNote = ({
  note,
  deleteNote,
  editNote,
}: {
  note: NoteClass;
  deleteNote: MouseEventHandler<HTMLButtonElement> | undefined;
  editNote: MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  let rnd: any;
  const [Z, setZ] = useState<number>(note.position.z);

  const [title, setTitle] = useState<string>(note.title);
  const [content, setContent] = useState<string>(note.content);

  const [colour, setColour] = useState<ColourInterface>(note.colours);
  const [showColourPallet, setShowColourPallet] = useState<boolean>(false);

  const onDragStop = (e: any, d: any) => {
    rnd.updatePosition({ x: d.lastX, y: d.lastY });
    note.position.x = d.x;
    note.position.y = d.y;
  };

  const onResizeStop = (e: any, direction: any, ref: any, delta: any, position: any) => {
    rnd.updateSize({ width: ref.style.width, height: ref.style.height, ...position });
    note.position.width = ref.style.width;
    note.position.height = ref.style.height;
  };

  const updateTitle = (title: string) => {
    setTitle(title);
    note.title = title;
  };

  const updateContent = (content: string) => {
    setContent(content);
    note.content = content;
  };

  const updateColourPallet = (
    backgroundColour: string,
    accentColour: string,
    isCustom: boolean,
  ) => {
    const updatedColour: ColourInterface = {
      backgroundColour: backgroundColour,
      accentColour: accentColour,
      isCustom: isCustom,
    };
    setColour(updatedColour);
    note.colours = updatedColour;
  };

  const updateZIndex = () => {
    setZ(Z + 10);
  };

  const toggleColourPallet = () => {
    updateZIndex;
    setShowColourPallet(!showColourPallet);
  };

  useEffect(() => {
    rnd.updatePosition({ x: note.position.x, y: note.position.y });
    rnd.updateSize({ width: note.position.width, height: note.position.height });
  }, []);

  return (
    <Rnd
      onResizeStart={updateZIndex}
      onDragStart={updateZIndex}
      onDragStop={(e, d) => onDragStop(e, d)}
      onResizeStop={(e, direction, ref, delta, position) =>
        onResizeStop(e, direction, ref, delta, position)
      }
      resizeGrid={[0.0001, 0.0001]}
      dragGrid={[0.0001, 0.0001]}
      ref={(c) => {
        rnd = c;
      }}
      disableDragging={note.edit || showColourPallet}
      style={{ zIndex: Z, borderColor: '#000fff', borderRadius: 3  }}
    >
      <Card className='draggable-card' style={{ backgroundColor: note.colours.backgroundColour, borderColor: '#000fff !important', borderRadius: 3 }}>
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
              WebkitTextFillColor: note.colours.accentColour,
            },
            WebkitTextFillColor: note.colours.accentColour,
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
              WebkitTextFillColor: note.colours.accentColour,
              backgroundColor: note.colours.backgroundColour,
            },
            WebkitTextFillColor: note.colours.accentColour,
            padding: 0,
            backgroundColor: note.colours.backgroundColour,
          }}
        />
        <Box className='draggable-box' sx={{ marginTop: 1 }}>
          <Tooltip title={showColourPallet ? 'Save Colour Change' : 'Change Note Colour'}>
            <IconButton
              className='draggable-button'
              onClick={toggleColourPallet}
              sx={{ color: note.colours.accentColour }}
            >
              {showColourPallet ? <InvertColorsOffTwoToneIcon /> : <InvertColorsTwoToneIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title={note.edit ? 'Save Note' : 'Edit Note'}>
            <IconButton
              className='draggable-button'
              onClick={editNote}
              sx={{ color: note.colours.accentColour }}
            >
              {note.edit ? <SaveTwoToneIcon /> : <EditTwoToneIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete Note'>
            <IconButton
              className='draggable-button'
              onClick={deleteNote}
              sx={{ color: note.colours.accentColour }}
            >
              <DeleteForeverTwoToneIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {showColourPallet && (
          <ColourPallet updateColourPallet={updateColourPallet} currentColour={colour} />
        )}
      </Card>
    </Rnd>
  );
};

export default DraggableNote;
