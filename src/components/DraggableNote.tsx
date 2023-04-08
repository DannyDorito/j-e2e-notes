import { MouseEventHandler, useEffect, useState } from 'react';
import { NoteClass } from '../classes/NoteClass';
import { ColourInterface } from '../classes/ColourInterface';
import { DraggableData, Rnd, ResizableDelta, Position, RndDragEvent } from 'react-rnd';
import { ResizeDirection } from 're-resizable';
import { Card, Stack, Chip, TextField, FilledInput, Box, Tooltip, IconButton } from '@mui/material';
import ColourPallet from './ColourPallet';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import InvertColorsTwoToneIcon from '@mui/icons-material/InvertColorsTwoTone';
import InvertColorsOffTwoToneIcon from '@mui/icons-material/InvertColorsOffTwoTone';
import LabelTwoToneIcon from '@mui/icons-material/LabelTwoTone';
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
  let rnd: Rnd | null;
  const [Z, setZ] = useState<number>(note.position.z);

  const [title, setTitle] = useState<string>(note.title);
  const [content, setContent] = useState<string>(note.content);

  const [colour, setColour] = useState<ColourInterface>(note.colours);
  const [showColourPallet, setShowColourPallet] = useState<boolean>(false);

  const onDragStop = (_event: RndDragEvent, d: DraggableData) => {
    rnd?.updatePosition({ x: d.lastX, y: d.lastY });
    note.position.x = d.x;
    note.position.y = d.y;
  };

  const onResizeStop = (
    _event: MouseEvent | TouchEvent,
    _direction: ResizeDirection,
    ref: HTMLElement,
    _delta: ResizableDelta,
    position: Position,
  ) => {
    rnd?.updateSize({ width: ref.style.width, height: ref.style.height, ...position });
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
    primary: string,
    secondary: string,
    accent: string,
    isCustom: boolean,
  ) => {
    const updatedColour: ColourInterface = {
      primary: primary,
      secondary: secondary,
      accent: accent,
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
    rnd?.updatePosition({ x: note.position.x, y: note.position.y });
    rnd?.updateSize({ width: note.position.width, height: note.position.height });
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
      style={{ zIndex: Z, borderColor: '#000fff' }}
    >
      <Card className='draggable-card' style={{ backgroundColor: note.colours.primary }}>
        <Stack
          direction='row'
          spacing={0.5}
          justifyContent='space-evenly'
          alignItems='center'
          sx={{ flexWrap: 'wrap' }}
        >
          {note.labels.map((label, index) => (
            <Chip
              label={label.name}
              key={`label-${index}`}
              onDelete={() => console.log('delete label')}
              sx={{ backgroundColor: note.colours.secondary, color: note.colours.accent }}
            />
          ))}
        </Stack>

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
              WebkitTextFillColor: note.colours.accent,
            },
            WebkitTextFillColor: note.colours.accent,
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
              WebkitTextFillColor: note.colours.accent,
              backgroundColor: note.colours.primary,
            },
            WebkitTextFillColor: note.colours.accent,
            padding: 0,
            backgroundColor: note.colours.primary,
          }}
        />
        <Box className='draggable-box' sx={{ marginTop: 1 }}>
          <Tooltip title={showColourPallet ? 'Save Colour Change' : 'Change Note Colour'}>
            <IconButton
              className='draggable-button'
              onClick={toggleColourPallet}
              sx={{ color: note.colours.accent }}
            >
              {showColourPallet ? <InvertColorsOffTwoToneIcon /> : <InvertColorsTwoToneIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title={note.edit ? 'Save Note' : 'Edit Note'}>
            <IconButton
              className='draggable-button'
              onClick={editNote}
              sx={{ color: note.colours.accent }}
            >
              {note.edit ? <SaveTwoToneIcon /> : <EditTwoToneIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title='Add Label'>
            <IconButton
              className='draggable-button'
              onClick={() => console.log('add label')}
              sx={{ color: note.colours.accent }}
            >
              <LabelTwoToneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete Note'>
            <IconButton
              className='draggable-button'
              onClick={deleteNote}
              sx={{ color: note.colours.accent }}
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
