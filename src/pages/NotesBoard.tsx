import { useEffect, useState } from 'react';
import { NoteClass } from '../classes/NoteClass';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from 'usehooks-ts';
import { NotificationClass } from '../classes/NotificationClass';
import { primary, white } from '../helpers/ThemeProvider';
import CustomNotification from '../components/CustomNotification';
import DraggableNote from '../components/DraggableNote';
import { UserClass } from '../classes/UserClass';
import { NIL as NIL_UUID } from 'uuid';
import { Box, List, ListItem, Modal, TextField, Typography } from '@mui/material';
import NoteMenu from './NoteMenu';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import IconButton from '@mui/material/IconButton/IconButton';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import LabelTwoToneIcon from '@mui/icons-material/LabelTwoTone';
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import './css/Notes.css';

const NotesBoard = ({ deauthenticate }: { deauthenticate: () => void }) => {
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
    updatedPerson.labels.filter((label) => label.id === id);
    setPerson(updatedPerson);
    addNotification(new NotificationClass(5000, 'success', 'Successfully Deleted Label!'));
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
              note={note}
              key={note.id}
              deleteNote={() => deleteNote(note.id)}
              editNote={() => editNote(note.id)}
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
            onClick={deauthenticate}
            sx={{ color: primary, position: 'fixed', bottom: 20, right: 170 }}
          >
            <LogoutTwoToneIcon />
          </IconButton>
        </Tooltip>

        {notifications.map((notification, index) => (
          <CustomNotification props={notification} key={`notification-${index}`} />
        ))}
      </Box>
      <Modal open={openLabelModal} onClose={closeLabelModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography textAlign='center' variant='body1'>
            Labels
          </Typography>
          <List>
            {person.labels.map((label) => (
              <ListItem
                key={`label-${label.id}`}
                sx={{ paddingRight: 0, paddingLeft: 0 }}
                secondaryAction={
                  <IconButton edge='end' aria-label='delete' onClick={() => removeLabel(label.id)}>
                    <DeleteForeverTwoToneIcon />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  <LabelTwoToneIcon />
                </ListItemIcon>
                <Typography variant='body1'>{label.name}</Typography>
              </ListItem>
            ))}
            <TextField
              label='New Label'
              value={newLabelName}
              onChange={(e) => setNewLabelName(e.target.value)}
              variant='standard'
              sx={{ width: '88%' }}
              error={newLabelNameError.length !== 0}
              helperText={newLabelNameError}
            />
            <Tooltip title='Save New Label'>
              <IconButton size='large' onClick={addLabel}>
                <SaveTwoToneIcon />
              </IconButton>
            </Tooltip>
          </List>
        </Box>
      </Modal>
    </>
  );
};

export default NotesBoard;
