import { useEffect, useState } from 'react';
import { NoteClass } from '../classes/NoteClass';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from 'usehooks-ts';
import { NotificationClass } from '../classes/NotificationClass';
import { primary, white } from '../helpers/ThemeProvider';
import { UserClass } from '../classes/UserClass';
import { NotesBoardProps } from '../props/NotesBoardProps';
import { NIL as NIL_UUID } from 'uuid';
import { Box, Tooltip } from '@mui/material';
import CustomNotification from '../components/CustomNotification';
import DraggableNote from '../components/DraggableNote';
import NoteMenu from './NoteMenu';
import AddLabelModal from '../components/AddLabelModal';
import IconButton from '@mui/material/IconButton/IconButton';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import LabelTwoToneIcon from '@mui/icons-material/LabelTwoTone';
import './css/Notes.css';

const NotesBoard = ({ props }: { props: NotesBoardProps }) => {
  const [person, setPerson] = useLocalStorage<UserClass>(
    'user',
    new UserClass('', NIL_UUID, false, []),
  );
  const [notes, setNotes] = useLocalStorage<NoteClass[]>('notes', []);
  const [notifications, setNotifications] = useState<NotificationClass[]>([]);

  const [openLabelModal, setOpenLabelModal] = useState<boolean>(false);
  const [newLabelName, setNewLabelName] = useState<string>('');
  const [newLabelNameError, setNewLabelNameError] = useState<string>('');

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
      new NoteClass(
        '',
        '',
        uuidv4(),
        new Date().toUTCString(),
        {
          x: 20,
          y: 20,
          z: 1,
          width: '300px',
          height: '300px',
        },
        [],
      ),
    ]);
    addNotification(new NotificationClass(5000, 'success', 'Successfully Created Note!'));
  };

  const saveNotes = () => {
    setNotes((notes) => [...notes]);
    addNotification(new NotificationClass(5000, 'success', 'Successfully Saved Note!'));
  };

  const addLabel = () => {
    if (person.labels.some((label) => label.name === newLabelName)) {
      setNewLabelNameError('Label Already Exists!');
    } else if (newLabelName.trim().length === 0) {
      setNewLabelNameError('Label Cannot Be Blank!');
    } else {
      const updatedPerson = person;
      updatedPerson.labels.push({ name: newLabelName.trim(), id: uuidv4() });
      setPerson(updatedPerson);
      setNewLabelName('');
      addNotification(new NotificationClass(5000, 'success', 'Successfully Created Label!'));
    }
  };

  const removeLabel = (id: string) => {
    const updatedPerson = person;
    const labelsInUse =
      notes.length > 0
        ? notes.map((note) => note.labels.filter((label) => label.id === id))[0]
        : [];

    if (labelsInUse.length > 0) {
      addNotification(new NotificationClass(5000, 'error', 'Label Currently In Use!'));
    } else {
      updatedPerson.labels = updatedPerson.labels.filter((label) => label.id !== id);
      setPerson(updatedPerson);
      addNotification(new NotificationClass(5000, 'success', 'Successfully Deleted Label!'));
    }
  };

  const closeLabelModal = () => {
    setOpenLabelModal(false);
    setNewLabelName('');
    setNewLabelNameError('');
  };

  return (
    <>
      <NoteMenu />
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
              }}
            ></DraggableNote>
          ))}
        <Tooltip title='Add New Note'>
          <IconButton
            size='large'
            onClick={addNote}
            sx={{ color: primary, position: 'fixed', bottom: 20, right: 20 }}
          >
            <AddCircleTwoToneIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title='Add Label'>
          <IconButton
            size='large'
            onClick={() => setOpenLabelModal(true)}
            sx={{ color: primary, position: 'fixed', bottom: 20, right: 70 }}
          >
            <LabelTwoToneIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title='Save Notes'>
          <IconButton
            size='large'
            onClick={saveNotes}
            sx={{ color: primary, position: 'fixed', bottom: 20, right: 120 }}
          >
            <SaveTwoToneIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title='Logout'>
          <IconButton
            size='large'
            onClick={props.deauthenticate}
            sx={{ color: primary, position: 'fixed', bottom: 20, right: 170 }}
          >
            <LogoutTwoToneIcon />
          </IconButton>
        </Tooltip>

        {notifications.map((notification, index) => (
          <CustomNotification props={notification} key={`notification-${index}`} />
        ))}
      </Box>
      <AddLabelModal
        props={{
          openLabelModal: openLabelModal,
          closeLabelModal: closeLabelModal,
          removeLabel: removeLabel,
          person: person,
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
