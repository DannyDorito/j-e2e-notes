import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { Notification } from '../interfaces/Notification';
import { User } from '../interfaces/User';
import {
  v4 as uuidv4,
  version as uuidVersion,
  validate as uuidValidate,
  NIL as NIL_UUID,
} from 'uuid';
import CustomNotification from '../components/CustomNotification';
import Login from './Login';
import NotesBoard from './NotesBoard';
import UserProfile from './UserProfile';
import NoteMenu from './NoteMenu';
import Error from './Error';

const Router = () => {
  const navigate = useNavigate();

  const [user, setUser] = useLocalStorage<User | undefined>('user', undefined);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Notification) => {
    if (user?.options.showNotifications) {
      setNotifications((notifications) => [...notifications, notification]);
    }
  };

  useEffect(() => {
    notifications.forEach((notification, index, object) => {
      const expiry = new Date(notification.created.getTime() + notification.autoHideDuration);
      if (expiry < new Date() || !notification.open) {
        object.splice(index, 1);
      }
    });
  }, [notifications]);

  const authenticate = () => {
    setUser({
      name: 'John',
      uuid: uuidv4(),
      authenticated: true,
      labels: [],
      options: {
        showNotifications: true,
        notificationsDuration: 5000,
        archiveDuration: 30, //days
      },
      avatar: '',
      notes: [],
    });
    addNotification({
      open: true,
      autoHideDuration: user?.options.notificationsDuration ?? 5000,
      severity: 'success',
      content: 'Successfully Logged In!',
      created: new Date(),
    });
    navigate('/notes');
  };

  const deauthenticate = () => {
    setUser(undefined);
    addNotification({
      open: true,
      autoHideDuration: user?.options.notificationsDuration ?? 5000,
      severity: 'success',
      content: 'Successfully Logged Out!',
      created: new Date(),
    });
    navigate('/');
  };

  const authenticated = (): boolean => {
    if (user === undefined || user?.authenticated === undefined) {
      return false;
    } else {
      return user?.authenticated && validUUID(user.uuid);
    }
  };

  const validUUID = (uuid: string) => {
    return uuid !== NIL_UUID && uuidValidate(uuid) && uuidVersion(uuid) === 4;
  };

  return (
    <>
      {authenticated() && <NoteMenu />}
      <Routes>
        <Route
          index
          path='/'
          element={
            <Login
              props={{
                deauthenticate: deauthenticate,
                authenticate: authenticate,
                user: user,
                setUser: setUser,
                addNotification: addNotification,
              }}
            />
          }
        />
        <Route
          path='/notes'
          element={
            authenticated() ? (
              <NotesBoard
                props={{
                  deauthenticate: deauthenticate,
                  user: user,
                  setUser: setUser,
                  addNotification: addNotification,
                }}
              />
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route
          path='/profile'
          element={
            authenticated() ? (
              <UserProfile
                props={{ user: user, setUser: setUser, addNotification: addNotification }}
              />
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route path='*' element={<Error />} />
      </Routes>
      {notifications.map((notification, index) => (
        <CustomNotification props={notification} key={`notification-${index}`} />
      ))}
    </>
  );
};

export default Router;
