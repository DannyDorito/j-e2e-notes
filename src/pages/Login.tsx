import { useState } from 'react';
import {
  v4 as uuidv4,
  version as uuidVersion,
  validate as uuidValidate,
  NIL as NIL_UUID,
} from 'uuid';
import { NotificationClass } from '../classes/NotificationClass';
import NotesBoard from './NotesBoard';
import CustomNotification from '../components/CustomNotification';
import Box from '@mui/material/Box/Box';
import IconButton from '@mui/material/IconButton/IconButton';
import Typography from '@mui/material/Typography/Typography';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import './css/Login.css';
import { primary, white } from '../helpers/ThemeProvider';
import { UserClass } from '../classes/UserClass';
import { useLocalStorage } from 'usehooks-ts';

const Login = () => {
  const [person, setPerson] = useLocalStorage<UserClass>(
    'user',
    new UserClass('', NIL_UUID, false),
  );

  const [notifications, setNotifications] = useState<NotificationClass[]>([]);
  const addNotification = (notification: NotificationClass) => {
    setNotifications((notifications) => [...notifications, notification]);
  };

  const authenticate = () => {
    setPerson(new UserClass('John', uuidv4(), true));
  };

  const deauthenticate = () => {
    setPerson(new UserClass('', NIL_UUID, false));
    addNotification(new NotificationClass(5000, 'success', 'Successfully Logged Out!'));
  };

  const validUUID = (uuid: string) => {
    return uuid !== NIL_UUID && uuidValidate(uuid) && uuidVersion(uuid) === 4;
  };

  if (!person.authenticated && !validUUID(person.uuid)) {
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: white,
          }}
          alignItems='center'
          justifyContent='center'
        >
          <IconButton size='large' sx={{ color: primary }} onClick={authenticate}>
            <LoginTwoToneIcon />
            <Typography variant='body1'>Login</Typography>
          </IconButton>
          {notifications.map((notification, index) => (
            <CustomNotification props={notification} key={`notification-${index}`} />
          ))}
        </Box>
      </>
    );
  } else {
    return <NotesBoard deauthenticate={deauthenticate} />;
  }
};

export default Login;
