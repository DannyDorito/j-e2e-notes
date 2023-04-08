import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { NotificationClass } from '../classes/NotificationClass';
import { UserClass } from '../classes/UserClass';
import { v4 as uuidv4, NIL as NIL_UUID } from 'uuid';
import CustomNotification from '../components/CustomNotification';
import Login from './Login';
import NotesBoard from './NotesBoard';

const Router = () => {
  const navigate = useNavigate();

  const [person, setPerson] = useLocalStorage<UserClass>(
    'user',
    new UserClass('', NIL_UUID, false, []),
  );

  const [notifications, setNotifications] = useState<NotificationClass[]>([]);

  const addNotification = (notification: NotificationClass) => {
    setNotifications((notifications) => [...notifications, notification]);
  };

  const authenticate = () => {
    setPerson(new UserClass('John', uuidv4(), true, []));
    navigate('/notes');
  };

  const deauthenticate = () => {
    setPerson(new UserClass('', NIL_UUID, false, []));
    addNotification(new NotificationClass(5000, 'success', 'Successfully Logged Out!'));
    navigate('/');
  };

  return (
    <>
      <Routes>
        <Route
          index
          path='/'
          element={
            <Login
              props={{
                deauthenticate: deauthenticate,
                authenticate: authenticate,
                person: person,
                setPerson: setPerson,
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
                person: person,
                setPerson: setPerson,
                addNotification: addNotification,
              }}
            />
          }
        />
      </Routes>
      {notifications.map((notification, index) => (
        <CustomNotification props={notification} key={`notification-${index}`} />
      ))}
    </>
  );
};

export default Router;
