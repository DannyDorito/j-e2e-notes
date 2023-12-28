import { IconButton, Tooltip } from '@mui/material';
import { primary } from '../helpers/ThemeProvider';
import { NotesFunctionMenuProps } from '../props/NotesFunctionMenuProps';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import LabelTwoToneIcon from '@mui/icons-material/LabelTwoTone';
export const NotesFunctionMenu = ({ props }: { props: NotesFunctionMenuProps }) => {
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

      <Tooltip title='Edit Labels'>
        <IconButton
          size='large'
          onClick={() => props.setOpenLabelModal(true)}
          sx={{ color: primary, position: 'fixed', bottom: 20, right: 70 }}
        >
          <LabelTwoToneIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title='Logout'>
        <IconButton
          size='large'
          onClick={props.deauthenticate}
          sx={{ color: primary, position: 'fixed', bottom: 20, right: 120 }}
        >
          <LogoutTwoToneIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default NotesFunctionMenu;
