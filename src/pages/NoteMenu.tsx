import { invertedTextColour, primary } from '../helpers/ThemeProvider';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { AddPossesive } from '../helpers/AddPossessive';
import { NoteMenuProps } from '../props/NoteMenuProps';

const NoteMenu = ({ props }: { props: NoteMenuProps }) => {
  const navigate = useNavigate();

  return (
    <AppBar position='static' sx={{ backgroundColor: primary }}>
      <Container maxWidth='xl'>
        <Toolbar id='notes-toolbar'>
          <Typography
            variant='h6'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              textDecoration: 'none',
              cursor: 'pointer',
              color: invertedTextColour,
            }}
            onClick={() => navigate('/notes')}
          >
            {AddPossesive(props.user.name)} Notes App
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              color='inherit'
            >
              <MenuTwoToneIcon />
            </IconButton>
          </Box>
          <Typography
            variant='h1'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {AddPossesive(props.user.name)} Notes App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            {props.user !== undefined && (
              <Tooltip title={AddPossesive(props.user.name) + ' Profile'}>
                <IconButton sx={{ p: 0 }} onClick={() => navigate('/profile')}>
                  <Avatar alt={props.user.name} src={props.user.avatar} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NoteMenu;
