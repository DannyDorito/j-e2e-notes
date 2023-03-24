import { useEffect, useState } from 'react';
import { NoteClass } from '../classes/NoteClass';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from 'usehooks-ts';
import { NotificationClass } from '../classes/NotificationClass';
import CustomNotification from '../components/CustomNotification';
import DraggableNote from '../components/DraggableNote';
import Box from '@mui/material/Box/Box';
import IconButton from '@mui/material/IconButton/IconButton';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import './css/Notes.css';

const Notes = () => {
  const [notes, setNotes] = useLocalStorage<NoteClass[]>('notes', []);
  const [notifications, setNotifications] = useState<NotificationClass[]>([]);
  const addNotification = (notification: NotificationClass) => {
    setNotifications((notifications) => [...notifications, notification]);
  };

  useEffect(() => {
    addNotification(new NotificationClass(5000, 'success', 'Successfully Logged in!'));
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
    addNotification(new NotificationClass(5000, 'success', 'Successfully Deleted Note!'))
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
    setNotes((notes) => [...notes, new NoteClass('', uuidv4(), new Date().toUTCString(), 20, 20)]);
    addNotification(new NotificationClass(5000, 'success', 'Successfully Created Note!'))
  };

  const saveNotes = () => {
    setNotes((notes) => [...notes]);
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
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
          size={'large'}
          style={{ position: 'fixed', bottom: 15, right: 15 }}
          onClick={addNote}
        >
          <AddCircleTwoToneIcon />
        </IconButton>
        <IconButton
          size={'large'}
          style={{ position: 'fixed', bottom: 15, right: 55 }}
          onClick={saveNotes}
        >
          <SaveTwoToneIcon />
        </IconButton>
        {notifications.map((notification, index) => (
          <CustomNotification props={notification} key={`notification-${index}`} />
        ))}
      </Box>
    </>
  );
};

export default Notes;
