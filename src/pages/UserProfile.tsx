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
import { backgroundColour, primary, textColour } from '../helpers/ThemeProvider';
import { useNavigate } from 'react-router-dom';
import { AddPossesive } from '../helpers/AddPossessive';
import { useDarkMode } from 'usehooks-ts';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import FingerprintTwoToneIcon from '@mui/icons-material/FingerprintTwoTone';
import TimelapseTwoToneIcon from '@mui/icons-material/TimelapseTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import { SetTextEnum } from '../enums/SetTextEnum';
import { ToggleOptionEnum } from '../enums/ToggleOptionEnum';
import { SetNumberEnum } from '../enums/SetNumberEnum';

const UserProfile = ({ props }: { props: ProfileProps }) => {
  const navigate = useNavigate();
  const { isDarkMode, toggle } = useDarkMode();

  const toggleOption = (checked: boolean, option: ToggleOptionEnum) => {
    const updatedUser = props.user;
    if (updatedUser === undefined) {
      return;
    }
    switch (option) {
      case ToggleOptionEnum.ShowNotifications:
        updatedUser.options.showNotifications = checked;
        props.setUser(updatedUser);
        break;

      default:
        break;
    }
  };

  const setText = (text: string, option: SetTextEnum) => {
    const updatedUser = props.user;
    if (updatedUser === undefined) {
      return;
    }
    switch (option) {
      case SetTextEnum.Name:
        updatedUser.name = text.trim();
        props.setUser(updatedUser);
        break;

      default:
        break;
    }
  };

  const setNumber = (number: number, options: SetNumberEnum) => {
    const updatedUser = props.user;
    if (updatedUser === undefined) {
      return;
    }
    switch (options) {
      case SetNumberEnum.NotificationDuration:
        updatedUser.options.notificationsDuration = number * 1000; //to ms
        props.setUser(updatedUser);
        break;
      default:
        break;
    }
  };

  const handleUploadClick = (event: { target: HTMLInputElement }) => {
    if (event.target.files === null) {
      return;
    }
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (props.user === undefined) {
        return;
      }
      const updatedUser = props.user;
      updatedUser.avatar = reader.result as string;
      props.setUser(updatedUser);
    };

    reader.readAsDataURL(file);
  };

  const save = () => {
    props.addNotification({
      open: true,
      autoHideDuration: props.user?.options.notificationsDuration ?? 5000,
      severity: 'success',
      content: 'Successfully Saved Settings!',
    });
    navigate('/notes');
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: backgroundColour,
          height: '100vh',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant='body1' sx={{ color: textColour }}>{`${AddPossesive(
          props.user?.name as string,
        )} Profile`}</Typography>
        <List
          sx={{
            width: '80%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 720,
            color: textColour,
          }}
        >
          <ListItem>
            <ListItemIcon>
              <BadgeTwoToneIcon sx={{ color: primary }} />
            </ListItemIcon>
            <ListItemText primary='Name' />
            <Box>
              <TextField
                id='user-name'
                variant='standard'
                value={props.user?.name}
                sx={{ input: { color: textColour } }}
                onChange={(event) => setText(event.target.value.trim(), SetTextEnum.Name)}
              ></TextField>
            </Box>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FingerprintTwoToneIcon sx={{ color: primary }} />
            </ListItemIcon>
            <ListItemText primary='User Id' />
            <Box>
              <Typography variant='body1'>{props.user?.uuid}</Typography>
            </Box>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccountCircleTwoToneIcon sx={{ color: primary }} />
            </ListItemIcon>
            <ListItemText primary='Avatar' />
            <input
              accept='image/*'
              id='contained-button-file'
              type='file'
              onChange={handleUploadClick}
              hidden
            />
            <label htmlFor='contained-button-file'>
              <CloudUploadTwoToneIcon sx={{ color: primary, cursor: 'pointer' }} />
            </label>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <NotificationsActiveTwoToneIcon sx={{ color: primary }} />
            </ListItemIcon>
            <ListItemText primary='Show Notifications' />
            <Switch
              edge='end'
              onChange={(event) =>
                toggleOption(event.target.checked, ToggleOptionEnum.ShowNotifications)
              }
              checked={props.user?.options.showNotifications}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <TimelapseTwoToneIcon sx={{ color: primary }} />
            </ListItemIcon>
            <ListItemText primary='Notification Duration' />
            <TextField
              id='notification-duration'
              variant='standard'
              type='number'
              disabled={!props.user?.options.showNotifications}
              value={
                (props.user?.options?.notificationsDuration
                  ? props.user?.options?.notificationsDuration
                  : 0) / 1000
              } // from ms
              InputProps={{
                inputProps: { min: 1, max: Number.MAX_SAFE_INTEGER / 1000 },
                endAdornment: <InputAdornment position='end'>seconds</InputAdornment>,
              }}
              sx={{ input: { color: textColour } }}
              onChange={(event) =>
                setNumber(+event.target.value, SetNumberEnum.NotificationDuration)
              }
            ></TextField>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <DarkModeTwoToneIcon sx={{ color: primary }} />
            </ListItemIcon>
            <ListItemText primary='Dark Mode' />
            <Switch edge='end' onChange={toggle} checked={isDarkMode} />
          </ListItem>
        </List>
        <Tooltip title='Save'>
          <IconButton aria-label='Save' onClick={save}>
            <SaveTwoToneIcon sx={{ color: primary }} />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};

export default UserProfile;
