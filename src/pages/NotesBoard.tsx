import { useState } from 'react';
import { Note } from '../interfaces/Note';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from 'usehooks-ts';
import { backgroundColour } from '../helpers/ThemeProvider';
import { NotesBoardProps } from '../props/NotesBoardProps';
import { randomColour } from '../helpers/RandomColour';
import { Box } from '@mui/material';
import DraggableNote from '../components/DraggableNote';
import AddLabelModal from '../components/AddLabelModal';
import NotesFunctionMenu from '../components/NotesFunctionMenu';
import './css/Notes.css';

const NotesBoard = ({ props }: { props: NotesBoardProps }) => {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);

  const [openLabelModal, setOpenLabelModal] = useState<boolean>(false);
  const [newLabelName, setNewLabelName] = useState<string>('');
  const [newLabelNameError, setNewLabelNameError] = useState<string>('');

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
    props.addNotification({
      open: true,
      autoHideDuration: props.user?.options.notificationsDuration ?? 5000,
      severity: 'success',
      content: 'Successfully Deleted Note!',
    });
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
      {
        title: '',
        content: '',
        id: uuidv4(),
        deletedAt: undefined,
        createdAt: new Date().toUTCString(),
        position: {
          x: 84,
          y: 84,
          z: 1,
          width: '320px',
          height: '320px',
        },
        colours: randomColour(),
        edit: false,
        labels: [],
        pinned: false,
        image: null,
      },
    ]);
    props.addNotification({
      open: true,
      autoHideDuration: props.user?.options.notificationsDuration ?? 5000,
      severity: 'success',
      content: 'Successfully Created Note!',
    });
  };

  const saveNotes = () => {
    setNotes((notes) => [...notes]);
    props.addNotification({
      open: true,
      autoHideDuration: props.user?.options.notificationsDuration ?? 5000,
      severity: 'success',
      content: 'Successfully Saved Note!',
    });
  };

  const addLabel = () => {
    if (props.user?.labels.some((label) => label.name === newLabelName)) {
      setNewLabelNameError('Label Already Exists!');
    } else if (newLabelName.trim().length === 0) {
      setNewLabelNameError('Label Cannot Be Blank!');
    } else {
      const updatedUser = props.user;
      if (updatedUser === undefined) {
        return;
      }
      updatedUser.labels.push({ name: newLabelName.trim(), id: uuidv4() });
      props.setUser(updatedUser);
      setNewLabelName('');
      props.addNotification({
        open: true,
        autoHideDuration: props.user?.options.notificationsDuration ?? 5000,
        severity: 'success',
        content: 'Successfully Created Label!',
      });
    }
  };

  const removeLabel = (id: string) => {
    const updatedUser = props.user;
    if (updatedUser === undefined) {
      return;
    }
    const labelsInUse =
      notes.length > 0
        ? notes.map((note) => note.labels.filter((label) => label.id === id))[0]
        : [];

    if (labelsInUse.length > 0) {
      props.addNotification({
        open: true,
        autoHideDuration: props.user?.options.notificationsDuration ?? 5000,
        severity: 'error',
        content: 'Label Currently In Use!',
      });
    } else {
      updatedUser.labels = updatedUser.labels.filter((label) => label.id !== id);
      props.setUser(updatedUser);
      props.addNotification({
        open: true,
        autoHideDuration: props.user?.options.notificationsDuration ?? 5000,
        severity: 'success',
        content: 'Successfully Deleted Label!',
      });
    }
  };

  const closeLabelModal = () => {
    setOpenLabelModal(false);
    setNewLabelName('');
    setNewLabelNameError('');
  };

  const setPinned = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              pinned: !note.pinned,
            }
          : note,
      ),
    );
  };

  return (
    <>
      <Box
        sx={{ flexGrow: 1, backgroundColor: backgroundColour, height: 'calc(100vh - 64px)' }}
        id='notes-board'
      >
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
                setPinned: () => setPinned(note.id),
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
