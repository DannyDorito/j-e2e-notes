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
import DeletedArchivedNotes from './DeletedArchivedNotes';
import { DeletedArchivedEnum } from '../enums/DeletedArchivedEnum';

const Router = () => {
  const navigate = useNavigate();

  const [user, setUser] = useLocalStorage<User | undefined>('user', undefined);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Notification) => {
    if (user !== undefined && user.options.showNotifications) {
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
    if (user === undefined) {
      setAuthenticated(true);
      setUser({
        name: 'John',
        uuid: uuidv4(),
        labels: [],
        options: {
          showNotifications: true,
          notificationsDuration: 5000,
          archiveDuration: 30, //days
        },
        avatar: '',
        notes: [],
      });
    } else {
      setAuthenticated(true);
    }
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
    if (user !== undefined) {
      setUser({ ...user });
      addNotification({
        open: true,
        autoHideDuration: user.options.notificationsDuration ?? 5000,
        severity: 'success',
        content: 'Successfully Logged Out!',
        created: new Date(),
      });
      navigate('/');
    }
  };

  const isAuthenticated = (): boolean => {
    if (user === undefined || !authenticated) {
      return false;
    } else {
      return authenticated && validUUID(user.uuid);
    }
  };

  const validUUID = (uuid: string) => {
    return uuid !== NIL_UUID && uuidValidate(uuid) && uuidVersion(uuid) === 4;
  };

  return (
    <>
      {isAuthenticated() && user !== undefined && <NoteMenu props={{ user }} />}
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
            isAuthenticated() && user !== undefined ? (
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
            isAuthenticated() && user !== undefined ? (
              <UserProfile
                props={{ user: user, setUser: setUser, addNotification: addNotification }}
              />
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route
          path='/archived'
          element={
            isAuthenticated() && user !== undefined ? (
              <DeletedArchivedNotes props={{ type: DeletedArchivedEnum.Archived }} />
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route
          path='/deleted'
          element={
            isAuthenticated() && user !== undefined ? (
              <DeletedArchivedNotes props={{ type: DeletedArchivedEnum.Deleted }} />
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
