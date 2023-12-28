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
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import LabelTwoToneIcon from '@mui/icons-material/LabelTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import {
  backgroundColour,
  invertedBackgroundColour,
  primary,
  textColour,
} from '../helpers/ThemeProvider';

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
          bgcolor: backgroundColour,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography textAlign='center' variant='h6' sx={{ color: textColour }}>
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
                  sx={{ color: primary }}
                >
                  <DeleteForeverTwoToneIcon />
                </IconButton>
              }
            >
              <ListItemIcon sx={{ color: primary }}>
                <LabelTwoToneIcon />
              </ListItemIcon>
              <Typography variant='body1' sx={{ WebkitTextFillColor: textColour }}>
                {label.name}
              </Typography>
            </ListItem>
          ))}
          {(props.user.labels.length as number) > 0 && (
            <Divider
              sx={{ marginBottom: '12px', backgroundColor: invertedBackgroundColour }}
            ></Divider>
          )}
          <ListItem
            key='label-add'
            sx={{ paddingRight: 0, paddingLeft: 0 }}
            secondaryAction={
              <IconButton
                edge='end'
                aria-label='delete'
                onClick={props.addLabel}
                sx={{ color: primary }}
              >
                <SaveTwoToneIcon />
              </IconButton>
            }
          >
            <ListItemIcon sx={{ color: primary }}>
              <LabelTwoToneIcon />
            </ListItemIcon>
            <TextField
              label={
                <Typography variant='body2' sx={{ WebkitTextFillColor: textColour }}>
                  New Label
                </Typography>
              }
              value={props.newLabelName}
              onChange={(e) => props.setNewLabelName(e.target.value)}
              variant='standard'
              sx={{ input: { color: textColour } }}
              error={props.newLabelNameError.length !== 0}
              helperText={props.newLabelNameError}
            />
          </ListItem>
        </List>
        <Box
          sx={{
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Tooltip title='Save'>
            <IconButton aria-label='Save' onClick={props.closeLabelModal}>
              <SaveTwoToneIcon sx={{ color: primary }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddLabelModal;
