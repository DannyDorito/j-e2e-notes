import { useEffect, useState } from 'react';
import { NoteClass } from '../classes/NoteClass';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from 'usehooks-ts';
import { NotificationClass } from '../classes/NotificationClass';
import { white } from '../helpers/ThemeProvider';
import { NotesBoardProps } from '../props/NotesBoardProps';
import { Box } from '@mui/material';
import DraggableNote from '../components/DraggableNote';
import AddLabelModal from '../components/AddLabelModal';
import NotesFunctionMenu from '../components/NotesFunctionMenu';
import './css/Notes.css';

const NotesBoard = ({ props }: { props: NotesBoardProps }) => {
  const [notes, setNotes] = useLocalStorage<NoteClass[]>('notes', []);

  const [openLabelModal, setOpenLabelModal] = useState<boolean>(false);
  const [newLabelName, setNewLabelName] = useState<string>('');
  const [newLabelNameError, setNewLabelNameError] = useState<string>('');

  useEffect(() => {
    props.addNotification(
      new NotificationClass(
        props.user.options.notificationsDuration,
        'success',
        'Successfully Logged In!',
      ),
    );
  }, []);

  const deleteNote = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              deletedAt: new Date().toUTCString(),
            }
          : note,
      ),
    );
    props.addNotification(
      new NotificationClass(
        props.user.options.notificationsDuration,
        'success',
        'Successfully Deleted Note!',
      ),
    );
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
      new NoteClass(
        '',
        '',
        uuidv4(),
        new Date().toUTCString(),
        {
          x: 20,
          y: 20,
          z: 1,
          width: '320px',
          height: '320px',
        },
        [],
      ),
    ]);
    props.addNotification(
      new NotificationClass(
        props.user.options.notificationsDuration,
        'success',
        'Successfully Created Note!',
      ),
    );
  };

  const saveNotes = () => {
    setNotes((notes) => [...notes]);
    props.addNotification(
      new NotificationClass(
        props.user.options.notificationsDuration,
        'success',
        'Successfully Saved Note!',
      ),
    );
  };

  const addLabel = () => {
    if (props.user.labels.some((label) => label.name === newLabelName)) {
      setNewLabelNameError('Label Already Exists!');
    } else if (newLabelName.trim().length === 0) {
      setNewLabelNameError('Label Cannot Be Blank!');
    } else {
      const updateduser = props.user;
      updateduser.labels.push({ name: newLabelName.trim(), id: uuidv4() });
      props.setUser(updateduser);
      setNewLabelName('');
      props.addNotification(
        new NotificationClass(
          props.user.options.notificationsDuration,
          'success',
          'Successfully Created Label!',
        ),
      );
    }
  };

  const removeLabel = (id: string) => {
    const updateduser = props.user;
    const labelsInUse =
      notes.length > 0
        ? notes.map((note) => note.labels.filter((label) => label.id === id))[0]
        : [];

    if (labelsInUse.length > 0) {
      props.addNotification(new NotificationClass(5000, 'error', 'Label Currently In Use!'));
    } else {
      updateduser.labels = updateduser.labels.filter((label) => label.id !== id);
      props.setUser(updateduser);
      props.addNotification(new NotificationClass(5000, 'success', 'Successfully Deleted Label!'));
    }
  };

  const closeLabelModal = () => {
    setOpenLabelModal(false);
    setNewLabelName('');
    setNewLabelNameError('');
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, backgroundColor: white, height: '100vh' }}>
        {notes
          .filter((note) => !note.deletedAt)
          .map((note) => (
            <DraggableNote
              key={note.id}
              props={{
                note: note,
                deleteNote: () => deleteNote(note.id),
                editNote: () => editNote(note.id),
                addNotification: props.addNotification,
                user: props.user,
              }}
            ></DraggableNote>
          ))}
        <NotesFunctionMenu
          props={{
            addNote: addNote,
            saveNotes: saveNotes,
            setOpenLabelModal: setOpenLabelModal,
            deauthenticate: props.deauthenticate,
          }}
        />
      </Box>
      <AddLabelModal
        props={{
          openLabelModal: openLabelModal,
          closeLabelModal: closeLabelModal,
          removeLabel: removeLabel,
          user: props.user,
          addLabel: addLabel,
          newLabelName: newLabelName,
          setNewLabelName: setNewLabelName,
          newLabelNameError: newLabelNameError,
        }}
      />
    </>
  );
};

export default NotesBoard;
