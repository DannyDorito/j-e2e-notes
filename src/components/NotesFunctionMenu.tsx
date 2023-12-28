import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { primary } from '../helpers/ThemeProvider';
import { NotesFunctionMenuProps } from '../props/NotesFunctionMenuProps';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import LabelTwoToneIcon from '@mui/icons-material/LabelTwoTone';
import UnarchiveTwoToneIcon from '@mui/icons-material/UnarchiveTwoTone';
import RestoreFromTrashTwoToneIcon from '@mui/icons-material/RestoreFromTrashTwoTone';

export const NotesFunctionMenu = ({ props }: { props: NotesFunctionMenuProps }) => {
  const navigate = useNavigate();

  return (
    <>
      <Tooltip title='Add New Note'>
        <IconButton
          size='large'
          onClick={props.addNote}
          sx={{ color: primary, position: 'fixed', bottom: 20, right: 20 }}
        >
          <AddCircleTwoToneIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title='View Archived'>
        <IconButton
          size='large'
          onClick={() => navigate('/archived')}
          sx={{ color: primary, position: 'fixed', bottom: 20, right: 70 }}
        >
          <UnarchiveTwoToneIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title='View Deleted'>
        <IconButton
          size='large'
          onClick={() => navigate('/deleted')}
          sx={{ color: primary, position: 'fixed', bottom: 20, right: 120 }}
        >
          <RestoreFromTrashTwoToneIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title='Edit Labels'>
        <IconButton
          size='large'
          onClick={() => props.setOpenLabelModal(true)}
          sx={{ color: primary, position: 'fixed', bottom: 20, right: 170 }}
        >
          <LabelTwoToneIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title='Logout'>
        <IconButton
          size='large'
          onClick={props.deauthenticate}
          sx={{ color: primary, position: 'fixed', bottom: 20, right: 220 }}
        >
          <LogoutTwoToneIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default NotesFunctionMenu;
