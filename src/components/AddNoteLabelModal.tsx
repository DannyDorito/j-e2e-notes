import { AddNoteLabelModalProps } from '../props/AddNotelLabelModalProps';
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import LabelTwoToneIcon from '@mui/icons-material/LabelTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';

const AddNoteLabelModal = ({ props }: { props: AddNoteLabelModalProps }) => {

  const selected = (id: string): boolean => {
    return props.noteLabels.findIndex((note) => note.id === id) === 0;
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (event.target.checked) {
      const labelIndex = props.availableLabels.findIndex((n) => n.id === id);

      if (labelIndex > -1) {
        props.noteLabels.push(props.availableLabels[labelIndex]);
      }
    } else if (!event.target.checked) {
      props.noteLabels = props.noteLabels.filter((label) => label.id !== id);
    }
  }

  return (
    <Modal open={props.openAddNoteLabelModal} onClose={props.closeAddNoteLabelModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography textAlign='center' variant='body1'>
          {`${props.person.name}'s Labels`}
        </Typography>
        <FormGroup>
          {props.availableLabels.map((availableLabel) => (
              <FormControlLabel key={`label-${availableLabel.id}`}control={<Checkbox checked={selected(availableLabel.id)} onChange={(event) => onChange(event, availableLabel.id)} />} label={availableLabel.name} />
          ))}
        </FormGroup>
      </Box>
    </Modal>
  );
};

export default AddNoteLabelModal;
