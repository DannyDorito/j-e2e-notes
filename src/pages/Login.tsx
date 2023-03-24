import { useState } from 'react';
import {
  v4 as uuidv4,
  version as uuidVersion,
  validate as uuidValidate,
  NIL as NIL_UUID,
} from 'uuid';
import { NotificationClass } from '../classes/NotificationClass';
import Notes from './Notes';
import CustomNotification from '../components/CustomNotification';
import Box from '@mui/material/Box/Box';
import IconButton from '@mui/material/IconButton/IconButton';
import Typography from '@mui/material/Typography/Typography';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import './css/Login.css';

const Login = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [userUUID, setUserUUID] = useState<string>(NIL_UUID);

  const [notifications, setNotifications] = useState<NotificationClass[]>([]);
  const addNotification = (notification: NotificationClass) => {
    setNotifications((notifications) => [...notifications, notification]);
  };

  const authenticate = () => {
    setAuthenticated(true);
    setUserUUID(uuidv4());
    return true;
  };

  const deauthenticate = ()=> {
    setAuthenticated(false);
    setUserUUID(NIL_UUID);
    addNotification(new NotificationClass(5000, 'success', 'Successfully Logged Out!'));
    return true;
  };

  const validUUID = (uuid: string) => {
    return uuid !== NIL_UUID && uuidValidate(uuid) && uuidVersion(uuid) === 4;
  };

  if (!authenticated && !validUUID(userUUID)) {
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
          alignItems='center'
          justifyContent='center'
        >
          <IconButton size={'large'} onClick={authenticate}>
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
    return <Notes deauthenticate={deauthenticate} />;
  }
};

export default Login;
