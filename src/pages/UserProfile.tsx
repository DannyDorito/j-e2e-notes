import {
  Box,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { ProfileProps } from '../props/ProfileProps';
import { white } from '../helpers/ThemeProvider';
import { useNavigate } from 'react-router-dom';

import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import FingerprintTwoToneIcon from '@mui/icons-material/FingerprintTwoTone';
import TimelapseTwoToneIcon from '@mui/icons-material/TimelapseTwoTone';
import { AddPossesive } from '../helpers/AddPossessive';

const UserProfile = ({ props }: { props: ProfileProps }) => {
  const navigate = useNavigate();
  const toggleOption = (checked: boolean, option: 'showNotifications') => {
    const updatedUser = props.user;
    switch (option) {
      case 'showNotifications':
        updatedUser.options.showNotifications = checked;
        props.setUser(updatedUser);
        break;

      default:
        break;
    }
  };

  const setText = (text: string, option: 'name') => {
    const updatedUser = props.user;
    switch (option) {
      case 'name':
        updatedUser.name = text.trim();
        props.setUser(updatedUser);
        break;

      default:
        break;
    }
  };

  const setNumber = (number: number, options: 'notificationDuration') => {
    const updatedUser = props.user;
    switch (options) {
      case 'notificationDuration':
        updatedUser.options.notificationsDuration = number * 1000; //to ms
        props.setUser(updatedUser);
        break;
      default:
        break;
    }
  };

  const back = () => navigate(-1);

  return (
    <>
      <Box
        sx={{
          backgroundColor: white,
          height: '100vh',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant='body1'>{`${AddPossesive(props.user.name)} Profile`}</Typography>
        <List
          sx={{
            width: '80%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 720,
          }}
        >
          <ListItem>
            <ListItemIcon>
              <NotificationsActiveTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary='Show Notifications' />
            <Switch
              edge='end'
              onChange={(event) => toggleOption(event.target.checked, 'showNotifications')}
              checked={props.user.options.showNotifications}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <TimelapseTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary='Notification Duration' />
            <TextField
              id='notification-duration'
              variant='standard'
              type='number'
              disabled={!props.user.options.showNotifications}
              value={props.user.options.notificationsDuration / 1000} // from ms
              InputProps={{ inputProps: { min: 1, max: Number.MAX_SAFE_INTEGER / 1000 }, endAdornment: <InputAdornment position='end'>seconds</InputAdornment>  }}
              onChange={(event) => setNumber(+event.target.value, 'notificationDuration')}
            ></TextField>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BadgeTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary='Name' />
            <Box>
              <TextField
                id='user-name'
                variant='standard'
                value={props.user.name}
                onChange={(event) => setText(event.target.value.trim(), 'name')}
              ></TextField>
            </Box>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FingerprintTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary='User Id' />
            <Box>
              <Typography variant='body1'>{props.user.uuid}</Typography>
            </Box>
          </ListItem>
        </List>
        <Tooltip title='Back'>
          <IconButton aria-label='Save' onClick={back}>
            <SaveTwoToneIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};

export default UserProfile;
