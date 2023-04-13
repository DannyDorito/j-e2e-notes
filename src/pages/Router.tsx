import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { NotificationClass } from '../classes/NotificationClass';
import { UserClass, defaultUser } from '../classes/UserClass';
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

const Router = () => {
  const navigate = useNavigate();

  const [user, setUser] = useLocalStorage<UserClass>(
    'user',
    defaultUser
  );

  const [notifications, setNotifications] = useState<NotificationClass[]>([]);

  const addNotification = (notification: NotificationClass) => {
    if (user.options.showNotifications) {
      setNotifications((notifications) => [...notifications, notification]);
    }
  };

  const authenticate = () => {
    setUser(new UserClass('John', uuidv4(), true, [], { showNotifications: true, notificationsDuration: 5000 }));
    navigate('/notes');
  };

  const deauthenticate = () => {
    setUser(defaultUser);
    addNotification(new NotificationClass(user.options.notificationsDuration, 'success', 'Successfully Logged Out!'));
    navigate('/');
  };

  const validUUID = (uuid: string) => {
    return uuid !== NIL_UUID && uuidValidate(uuid) && uuidVersion(uuid) === 4;
  };

  return (
    <>
      {user.authenticated && validUUID(user.uuid) && <NoteMenu />}
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
            <NotesBoard
              props={{
                deauthenticate: deauthenticate,
                user: user,
                setUser: setUser,
                addNotification: addNotification,
              }}
            />
          }
        />
        <Route path='/profile' element={<UserProfile props={{ user: user, setUser: setUser }} />} />
      </Routes>
      {notifications.map((notification, index) => (
        <CustomNotification props={notification} key={`notification-${index}`} />
      ))}
    </>
  );
};

export default Router;
