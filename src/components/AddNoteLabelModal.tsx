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

const AddNoteLabelModal = ({ props }: { props: AddNoteLabelModalProps }) => {
  const selected = (id: string): boolean => {
    return props.noteLabels.findIndex((note) => note.id === id) === 0;
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (event.target.checked) {
      const labelIndex = props.availableLabels.findIndex((n) => n.id === id);

      if (labelIndex > -1) {
        props.noteLabels.push(props.availableLabels[labelIndex]);
      }
    } else if (!event.target.checked) {
      props.noteLabels = props.noteLabels.filter((label) => label.id !== id);
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
          {`${props.user?.name as string}'s Labels`}
        </Typography>
        <FormGroup>
          {props.availableLabels.map((availableLabel) => (
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
              label={availableLabel.name}
            />
          ))}
        </FormGroup>
        <Box
          sx={{
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '32px',
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
