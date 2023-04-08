import { useEffect, useState } from 'react';
import { ColourInterface } from '../classes/ColourInterface';
import { DraggableData, Rnd, ResizableDelta, Position, RndDragEvent } from 'react-rnd';
import { ResizeDirection } from 're-resizable';
import { Card, Stack, Chip, TextField, FilledInput, Box, Tooltip, IconButton } from '@mui/material';
import { DraggableNotesProps } from '../props/DraggableNoteProps';
import ColourPallet from './ColourPallet';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import InvertColorsTwoToneIcon from '@mui/icons-material/InvertColorsTwoTone';
import InvertColorsOffTwoToneIcon from '@mui/icons-material/InvertColorsOffTwoTone';
import LabelTwoToneIcon from '@mui/icons-material/LabelTwoTone';
import './css/DraggableNote.css';

const DraggableNote = ({ props }: { props: DraggableNotesProps }) => {
  let rnd: Rnd | null;
  const [Z, setZ] = useState<number>(props.note.position.z);

  const [title, setTitle] = useState<string>(props.note.title);
  const [content, setContent] = useState<string>(props.note.content);

  const [colour, setColour] = useState<ColourInterface>(props.note.colours);
  const [showColourPallet, setShowColourPallet] = useState<boolean>(false);

  const onDragStop = (_event: RndDragEvent, d: DraggableData) => {
    rnd?.updatePosition({ x: d.lastX, y: d.lastY });
    props.note.position.x = d.x;
    props.note.position.y = d.y;
  };

  const onResizeStop = (
    _event: MouseEvent | TouchEvent,
    _direction: ResizeDirection,
    ref: HTMLElement,
    _delta: ResizableDelta,
    position: Position,
  ) => {
    rnd?.updateSize({ width: ref.style.width, height: ref.style.height, ...position });
    props.note.position.width = ref.style.width;
    props.note.position.height = ref.style.height;
  };

  const updateTitle = (title: string) => {
    setTitle(title);
    props.note.title = title;
  };

  const updateContent = (content: string) => {
    setContent(content);
    props.note.content = content;
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
    props.note.colours = updatedColour;
  };

  const updateZIndex = () => {
    setZ(Z + 10);
  };

  const toggleColourPallet = () => {
    updateZIndex;
    setShowColourPallet(!showColourPallet);
  };

  useEffect(() => {
    rnd?.updatePosition({ x: props.note.position.x, y: props.note.position.y });
    rnd?.updateSize({ width: props.note.position.width, height: props.note.position.height });
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
      disableDragging={props.note.edit || showColourPallet}
      style={{ zIndex: Z, borderColor: '#000fff' }}
    >
      <Card className='draggable-card' style={{ backgroundColor: props.note.colours.primary }}>
        <Stack
          direction='row'
          spacing={0.5}
          justifyContent='space-evenly'
          alignItems='center'
          sx={{ flexWrap: 'wrap' }}
        >
          {props.note.labels.map((label, index) => (
            <Chip
              label={label.name}
              key={`label-${index}`}
              onDelete={() => console.log('delete label')}
              sx={{
                backgroundColor: props.note.colours.secondary,
                color: props.note.colours.accent,
              }}
            />
          ))}
        </Stack>

        <TextField
          value={title}
          variant='standard'
          margin='none'
          multiline={false}
          disabled={!props.note.edit || showColourPallet}
          fullWidth={true}
          placeholder='Title'
          type='text'
          onChange={(event) => updateTitle(event.target.value)}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: props.note.colours.accent,
            },
            WebkitTextFillColor: props.note.colours.accent,
          }}
        />
        <FilledInput
          value={content}
          margin='none'
          multiline={true}
          disabled={!props.note.edit}
          fullWidth={true}
          placeholder='Contents'
          type='text'
          minRows={10}
          onChange={(event) => updateContent(event.target.value)}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: props.note.colours.accent,
              backgroundColor: props.note.colours.primary,
            },
            WebkitTextFillColor: props.note.colours.accent,
            padding: 0,
            backgroundColor: props.note.colours.primary,
          }}
        />
        <Box className='draggable-box' sx={{ marginTop: 1 }}>
          <Tooltip title={showColourPallet ? 'Save Colour Change' : 'Change Note Colour'}>
            <IconButton
              className='draggable-button'
              onClick={toggleColourPallet}
              sx={{ color: props.note.colours.accent }}
            >
              {showColourPallet ? <InvertColorsOffTwoToneIcon /> : <InvertColorsTwoToneIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title={props.note.edit ? 'Save Note' : 'Edit Note'}>
            <IconButton
              className='draggable-button'
              onClick={props.editNote}
              sx={{ color: props.note.colours.accent }}
            >
              {props.note.edit ? <SaveTwoToneIcon /> : <EditTwoToneIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title='Add Label'>
            <IconButton
              className='draggable-button'
              onClick={() => console.log('add label')}
              sx={{ color: props.note.colours.accent }}
            >
              <LabelTwoToneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete Note'>
            <IconButton
              className='draggable-button'
              onClick={props.deleteNote}
              sx={{ color: props.note.colours.accent }}
            >
              <DeleteForeverTwoToneIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {showColourPallet && (
          <ColourPallet props={{ updateColourPallet: updateColourPallet, currentColour: colour }} />
        )}
      </Card>
    </Rnd>
  );
};

export default DraggableNote;
