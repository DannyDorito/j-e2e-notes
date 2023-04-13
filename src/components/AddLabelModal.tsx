import { AddLabelModalProps } from '../props/AddLabelModalProps';
import {
  Box,
  Divider,
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

const AddLabelModal = ({ props }: { props: AddLabelModalProps }) => {
  return (
    <Modal open={props.openLabelModal} onClose={props.closeLabelModal}>
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
          {`${props.user.name}'s Labels`}
        </Typography>
        <List>
          {props.user.labels.map((label) => (
            <ListItem
              key={`label-${label.id}`}
              sx={{ paddingRight: 0, paddingLeft: 0 }}
              secondaryAction={
                <IconButton
                  edge='end'
                  aria-label='delete'
                  onClick={() => props.removeLabel(label.id)}
                >
                  <DeleteForeverTwoToneIcon />
                </IconButton>
              }
            >
              <ListItemIcon>
                <LabelTwoToneIcon />
              </ListItemIcon>
              <Typography variant='body1'>{label.name}</Typography>
            </ListItem>
          ))}
          {props.user.labels.length > 0 && <Divider sx={{ marginBottom: '12px' }}></Divider>}
          <ListItem
            key='label-add'
            sx={{ paddingRight: 0, paddingLeft: 0 }}
            secondaryAction={
              <IconButton edge='end' aria-label='delete' onClick={props.addLabel}>
                <SaveTwoToneIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <LabelTwoToneIcon />
            </ListItemIcon>
            <TextField
              label='New Label'
              value={props.newLabelName}
              onChange={(e) => props.setNewLabelName(e.target.value)}
              variant='standard'
              sx={{ width: '100%' }}
              error={props.newLabelNameError.length !== 0}
              helperText={props.newLabelNameError}
            />
          </ListItem>
        </List>
      </Box>
    </Modal>
  );
};

export default AddLabelModal;
