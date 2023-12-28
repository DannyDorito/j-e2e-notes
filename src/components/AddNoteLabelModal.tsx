import { backgroundColour, primary, textColour } from '../helpers/ThemeProvider';
import { AddNoteLabelModalProps } from '../props/AddNotelLabelModalProps';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from '@mui/material';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import { Label } from '../interfaces/Label';
import { useState } from 'react';

const AddNoteLabelModal = ({ props }: { props: AddNoteLabelModalProps }) => {
  const [availableLabels] = useState<Label[]>(props.user.labels);
  const [noteLabels, setNoteLabels] = useState<Label[]>(props.note.labels);
  const selected = (id: string): boolean => {
    return noteLabels.findIndex((note) => note.id === id) === 0;
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (event.target.checked) {
      const labelIndex = availableLabels?.findIndex((n) => n.id === id);
      if (labelIndex !== undefined && labelIndex > -1) {
        const labelToAdd = availableLabels?.filter(
          (_al, index) => index === labelIndex,
        )[0] as Label;
        setNoteLabels((noteLabels) => [...noteLabels, labelToAdd]);
        props.note.labels = [...noteLabels, labelToAdd];
      }
    } else if (!event.target.checked) {
      const updatedLabels = props.note.labels.filter((label) => label.id !== id);
      setNoteLabels(updatedLabels);
      props.note.labels = updatedLabels;
    }
  };

  return (
    <Modal open={props.openAddNoteLabelModal} onClose={props.closeAddNoteLabelModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: backgroundColour,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography textAlign='center' variant='h6' sx={{ color: textColour }}>
          {`${props.user.name as string}'s Labels`}
        </Typography>
        <FormGroup>
          {availableLabels?.map((availableLabel) => (
            <FormControlLabel
              key={`label-${availableLabel.id}`}
              control={
                <Checkbox
                  sx={{ color: primary }}
                  checked={selected(availableLabel.id)}
                  onChange={(event) => onChange(event, availableLabel.id)}
                />
              }
              sx={{ color: textColour }}
              label={
                <Typography variant='body2' sx={{ WebkitTextFillColor: textColour }}>
                  {availableLabel.name}
                </Typography>
              }
            />
          ))}
        </FormGroup>
        <Box
          sx={{
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Tooltip title='Save'>
            <IconButton aria-label='Save' onClick={props.closeAddNoteLabelModal}>
              <SaveTwoToneIcon sx={{ color: primary }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddNoteLabelModal;
