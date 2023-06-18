import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { NotificationClass } from '../classes/NotificationClass';
import { UserClass } from '../classes/UserClass';
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

  const [user, setUser] = useLocalStorage<UserClass | undefined>('user', undefined);

  const [notifications, setNotifications] = useState<NotificationClass[]>([]);

  const addNotification = (notification: NotificationClass) => {
    if (user?.options.showNotifications) {
      setNotifications((notifications) => [...notifications, notification]);
    }
  };

  const authenticate = () => {
    setUser(
      new UserClass('John', uuidv4(), true, [], '', {
        showNotifications: true,
        notificationsDuration: 5000,
      }),
    );
    addNotification(
      new NotificationClass(
        user?.options.notificationsDuration,
        'success',
        'Successfully Logged In!',
      ),
    );
    navigate('/notes');
  };

  const deauthenticate = () => {
    setUser(undefined);
    addNotification(
      new NotificationClass(
        user?.options.notificationsDuration,
        'success',
        'Successfully Logged Out!',
      ),
    );
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
