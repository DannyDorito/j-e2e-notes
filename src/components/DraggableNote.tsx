import { useEffect, useState } from 'react';
import { Colour } from '../interfaces/Colour';
import { DraggableData, Rnd, ResizableDelta, Position, RndDragEvent } from 'react-rnd';
import { ResizeDirection } from 're-resizable';
import { Card, Stack, Chip, TextField, FilledInput, Box, Tooltip, IconButton } from '@mui/material';
import { DraggableNotesProps } from '../props/DraggableNoteProps';
import ColourPalletModal from './ColourPalletModal';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import InvertColorsTwoToneIcon from '@mui/icons-material/InvertColorsTwoTone';
import InvertColorsOffTwoToneIcon from '@mui/icons-material/InvertColorsOffTwoTone';
import LabelTwoToneIcon from '@mui/icons-material/LabelTwoTone';
import PushPinTwoToneIcon from '@mui/icons-material/PushPinTwoTone';
import AddNoteLabelModal from './AddNoteLabelModal';
import './css/DraggableNote.css';
import { Label } from '../interfaces/Label';

const DraggableNote = ({ props }: { props: DraggableNotesProps }) => {
  let rnd: Rnd | null;
  const [width, setWidth] = useState<string>(props.note.position.width);
  const [height, setHeight] = useState<string>(props.note.position.height);
  const [Z, setZ] = useState<number>(props.note.position.z);

  const [title, setTitle] = useState<string>(props.note.title);
  const [content, setContent] = useState<string>(props.note.content);

  const [colour, setColour] = useState<Colour>(props.note.colours);
  const [showColourPallet, setShowColourPallet] = useState<boolean>(false);

  const [openNoteLabelModal, setOpenNoteLabelModal] = useState<boolean>(false);

  const onDragStop = (_event: RndDragEvent, d: DraggableData) => {
    if (canMoveOrResize()) {
      rnd?.updatePosition({ x: d.lastX, y: d.lastY });
      props.note.position.x = d.x;
      props.note.position.y = d.y;
    }
  };

  const onResizeStop = (
    _event: MouseEvent | TouchEvent,
    _direction: ResizeDirection,
    ref: HTMLElement,
    _delta: ResizableDelta,
    position: Position,
  ) => {
    if (canMoveOrResize()) {
      rnd?.updateSize({ width: ref.style.width, height: ref.style.height, ...position });
      props.note.position.width = ref.style.width;
      setWidth(ref.style.width);
      props.note.position.height = ref.style.height;
      setHeight(ref.style.height);
    }
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
    const updatedColour: Colour = {
      primary: primary,
      secondary: secondary,
      accent: accent,
      isCustom: isCustom,
    };
    setColour(updatedColour);
    props.note.colours = updatedColour;
    props.addNotification({
      open: true,
      autoHideDuration: props.user?.options.notificationsDuration ?? 5000,
      severity: 'success',
      content: 'Successfully Updated Colour Pallet!',
    });
  };

  const updateZIndex = () => {
    const newZ = Z + 10;
    setZ(newZ);
    props.note.position.z = newZ;
  };

  const toggleColourPallet = () => {
    updateZIndex;
    setShowColourPallet(!showColourPallet);
  };

  const closeAddNoteLabelModal = () => {
    setOpenNoteLabelModal(false);
  };

  const canMoveOrResize = (): boolean => {
    return props.note.edit || showColourPallet || props.note.pinned;
  };

  useEffect(() => {
    rnd?.updatePosition({ x: props.note.position.x, y: props.note.position.y });
    rnd?.updateSize({ width: width, height: height });
  }, [props.note.position.x, props.note.position.y, width, height]);

  return (
    <>
      <Rnd
        onResizeStart={updateZIndex}
        onDragStart={updateZIndex}
        onDragStop={(e, d) => onDragStop(e, d)}
        onResizeStop={(e, direction, ref, delta, position) =>
          onResizeStop(e, direction, ref, delta, position)
        }
        bounds={'#notes-board'}
        resizeGrid={[0.0001, 0.0001]}
        dragGrid={[0.0001, 0.0001]}
        ref={(c) => {
          rnd = c;
        }}
        disableDragging={canMoveOrResize()}
        enableResizing={!canMoveOrResize()}
        style={{ zIndex: Z, borderColor: '#000fff' }}
      >
        <Card
          className='draggable-card'
          style={{ backgroundColor: props.note.colours.primary, width: width, height: height }}
        >
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
                onClick={() => setOpenNoteLabelModal(true)}
                sx={{ color: props.note.colours.accent }}
              >
                <LabelTwoToneIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={props.note.pinned ? 'Unpin' : 'Pin'}>
              <IconButton
                className='draggable-button'
                onClick={() => props.setPinned(props.note.id)}
                sx={{ color: props.note.colours.accent }}
              >
                <PushPinTwoToneIcon
                  sx={{ rotate: props.note.pinned ? '0deg' : '20deg' }}
                  shapeRendering='geometricPrecision'
                />
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
            <ColourPalletModal
              props={{
                updateColourPallet: updateColourPallet,
                currentColour: colour,
                showColourPallet: showColourPallet,
                setShowColourPallet: setShowColourPallet,
              }}
            />
          )}
        </Card>
      </Rnd>
      <AddNoteLabelModal
        props={{
          availableLabels: props.user?.labels as Label[],
          noteLabels: props.note.labels,
          user: props.user,
          openAddNoteLabelModal: openNoteLabelModal,
          closeAddNoteLabelModal: closeAddNoteLabelModal,
        }}
      />
    </>
  );
};

export default DraggableNote;
