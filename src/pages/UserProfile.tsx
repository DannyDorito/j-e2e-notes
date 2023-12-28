import {
  Box,
  Grid,
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
import {
  backgroundColour,
  invertedBackgroundColour,
  invertedTextColour,
  primary,
} from '../helpers/ThemeProvider';
import { useNavigate } from 'react-router-dom';
import { AddPossesive } from '../helpers/AddPossessive';
import { useDarkMode } from 'usehooks-ts';
import { SetTextEnum } from '../enums/SetTextEnum';
import { ToggleOptionEnum } from '../enums/ToggleOptionEnum';
import { SetNumberEnum } from '../enums/SetNumberEnum';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import FingerprintTwoToneIcon from '@mui/icons-material/FingerprintTwoTone';
import SnoozeTwoToneIcon from '@mui/icons-material/SnoozeTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import TimerTwoToneIcon from '@mui/icons-material/TimerTwoTone';
import DeleteSweepTwoToneIcon from '@mui/icons-material/DeleteSweepTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';

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
        props.addNotification({
          open: true,
          autoHideDuration: props.user.options.notificationsDuration ?? 5000,
          severity: 'success',
          content: `Notifications are now ${checked ? 'enabled' : 'disabled'}!`,
          created: new Date(),
        });
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
        props.addNotification({
          open: true,
          autoHideDuration: props.user.options.notificationsDuration ?? 5000,
          severity: 'success',
          content: `Name updated to ${props.user.name}!`,
          created: new Date(),
        });
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
      case SetNumberEnum.ArchiveDuration:
        updatedUser.options.archiveDuration = number; //days
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
      props.addNotification({
        open: true,
        autoHideDuration: props.user.options.notificationsDuration ?? 5000,
        severity: 'success',
        content: 'Avatar Successfully Updated!',
        created: new Date(),
      });
    };

    reader.readAsDataURL(file);
  };

  const deleteAllNotes = () => {
    const updatedUser = props.user;
    updatedUser.notes = [];
    props.setUser(updatedUser);
    props.addNotification({
      open: true,
      autoHideDuration: props.user.options.notificationsDuration ?? 5000,
      severity: 'success',
      content: 'Successfully Deleted All Notes!',
      created: new Date(),
    });
  };

  const deleteAllLabels = () => {
    const updatedUser = props.user;
    updatedUser.labels = [];
    props.setUser(updatedUser);
    props.addNotification({
      open: true,
      autoHideDuration: props.user.options.notificationsDuration ?? 5000,
      severity: 'success',
      content: 'Successfully Deleted All Labels!',
      created: new Date(),
    });
  };

  const save = () => {
    props.addNotification({
      open: true,
      autoHideDuration: props.user.options.notificationsDuration ?? 5000,
      severity: 'success',
      content: 'Successfully Saved Settings!',
      created: new Date(),
    });
    navigate('/notes');
  };

  return (
    <>
      <Grid
        container
        component='main'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: backgroundColour,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: invertedBackgroundColour,
            border: '50px solid',
            borderColor: invertedBackgroundColour,
            minWidth: '700px',
          }}
        >
          <Typography variant='h6' sx={{ color: invertedTextColour }}>{`${AddPossesive(
            props.user.name as string,
          )} Profile`}</Typography>
          <List
            sx={{
              width: '80%',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 720,
              color: invertedTextColour,
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
                  value={props.user.name}
                  sx={{ input: { color: invertedTextColour } }}
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
                <Typography variant='body1'>{props.user.uuid}</Typography>
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
                checked={props.user.options.showNotifications}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <TimerTwoToneIcon sx={{ color: primary }} />
              </ListItemIcon>
              <ListItemText primary='Notification Duration' />
              <TextField
                id='notification-duration'
                variant='standard'
                type='number'
                disabled={!props.user.options.showNotifications}
                value={
                  (props.user.options?.notificationsDuration
                    ? props.user.options?.notificationsDuration
                    : 0) / 1000
                } // from ms
                InputProps={{
                  inputProps: { min: 1, max: Number.MAX_SAFE_INTEGER / 1000 },
                  endAdornment: <InputAdornment position='end'>seconds</InputAdornment>,
                }}
                sx={{ input: { color: invertedTextColour } }}
                onChange={(event) =>
                  setNumber(+event.target.value, SetNumberEnum.NotificationDuration)
                }
              ></TextField>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SnoozeTwoToneIcon sx={{ color: primary }} />
              </ListItemIcon>
              <ListItemText primary='Archive Duration' />
              <TextField
                id='archive-duration'
                variant='standard'
                type='number'
                value={
                  props.user.options?.archiveDuration ? props.user.options?.archiveDuration : 0
                } // from ms
                InputProps={{
                  inputProps: { min: 1, max: Number.MAX_SAFE_INTEGER },
                  endAdornment: <InputAdornment position='end'>days</InputAdornment>,
                }}
                sx={{ input: { color: invertedTextColour } }}
                onChange={(event) => setNumber(+event.target.value, SetNumberEnum.ArchiveDuration)}
              ></TextField>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DarkModeTwoToneIcon sx={{ color: primary }} />
              </ListItemIcon>
              <ListItemText primary='Dark Mode' />
              <Switch edge='end' onChange={toggle} checked={isDarkMode} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DeleteSweepTwoToneIcon sx={{ color: primary }} />
              </ListItemIcon>
              <ListItemText primary='Delete All Notes' />
              <IconButton
                aria-label='Delete All Labels'
                onClick={deleteAllNotes}
                size='small'
                sx={{ padding: '0' }}
              >
                <DeleteForeverTwoToneIcon sx={{ color: primary, cursor: 'pointer' }} />
              </IconButton>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DeleteSweepTwoToneIcon sx={{ color: primary }} />
              </ListItemIcon>
              <ListItemText primary='Delete All Labels' />
              <IconButton
                aria-label='Delete All Labels'
                onClick={deleteAllLabels}
                size='small'
                sx={{ padding: '0' }}
              >
                <DeleteForeverTwoToneIcon sx={{ color: primary, cursor: 'pointer' }} />
              </IconButton>
            </ListItem>
          </List>
          <Tooltip title='Save'>
            <IconButton aria-label='Save' onClick={save}>
              <SaveTwoToneIcon sx={{ color: primary }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>
    </>
  );
};

export default UserProfile;
