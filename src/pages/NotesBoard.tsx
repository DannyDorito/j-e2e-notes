import { useEffect, useState } from 'react';
import { NoteClass } from '../classes/NoteClass';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from 'usehooks-ts';
import { NotificationClass } from '../classes/NotificationClass';
import { primary, white } from '../helpers/ThemeProvider';
import CustomNotification from '../components/CustomNotification';
import DraggableNote from '../components/DraggableNote';
import NoteMenu from './Menu';
import Box from '@mui/material/Box/Box';
import IconButton from '@mui/material/IconButton/IconButton';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import './css/Notes.css';

const NotesBoard = ({ deauthenticate }: { deauthenticate: () => void }) => {
  const [notes, setNotes] = useLocalStorage<NoteClass[]>('notes', []);
  const [notifications, setNotifications] = useState<NotificationClass[]>([]);
  const addNotification = (notification: NotificationClass) => {
    setNotifications((notifications) => [...notifications, notification]);
  };

  useEffect(() => {
    addNotification(new NotificationClass(5000, 'success', 'Successfully Logged In!'));
  }, []);

  const deleteNote = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              deleted: true,
              deletedAt: new Date().toUTCString(),
            }
          : note,
      ),
    );
    addNotification(new NotificationClass(5000, 'success', 'Successfully Deleted Note!'));
  };

  const editNote = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              edit: !note.edit,
            }
          : note,
      ),
    );
  };

  const addNote = () => {
    setNotes((notes) => [
      ...notes,
      new NoteClass('', '', uuidv4(), new Date().toUTCString(), 20, 20),
    ]);
    addNotification(new NotificationClass(5000, 'success', 'Successfully Created Note!'));
  };

  const saveNotes = () => {
    setNotes((notes) => [...notes]);
    addNotification(new NotificationClass(5000, 'success', 'Successfully Saved Note!'));
  };

  return (
    <>
      <NoteMenu />
      <Box sx={{ flexGrow: 1, backgroundColor: white }}>
        {notes
          .filter((note) => !note.deleted)
          .map((note) => (
            <DraggableNote
              note={note}
              key={note.id}
              deleteNote={() => deleteNote(note.id)}
              editNote={() => editNote(note.id)}
            ></DraggableNote>
          ))}
        <IconButton
          size='large'
          onClick={addNote}
          sx={{ color: primary, position: 'fixed', bottom: 20, right: 20 }}
        >
          <AddCircleTwoToneIcon />
        </IconButton>
        <IconButton
          size='large'
          onClick={saveNotes}
          sx={{ color: primary, position: 'fixed', bottom: 20, right: 70 }}
        >
          <SaveTwoToneIcon />
        </IconButton>
        <IconButton
          size='large'
          onClick={deauthenticate}
          sx={{ color: primary, position: 'fixed', bottom: 20, right: 120 }}
        >
          <LogoutTwoToneIcon />
        </IconButton>
        {notifications.map((notification, index) => (
          <CustomNotification props={notification} key={`notification-${index}`} />
        ))}
      </Box>
    </>
  );
};

export default NotesBoard;