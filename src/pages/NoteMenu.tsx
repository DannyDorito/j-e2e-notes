import { useLocalStorage } from 'usehooks-ts';
import { User } from '../interfaces/User';
import { primary } from '../helpers/ThemeProvider';
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

const NoteMenu = () => {
  const navigate = useNavigate();
  const [user] = useLocalStorage<User | undefined>('user', undefined);

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
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/notes')}
          >
            {AddPossesive(user?.name)} Notes App
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
            {AddPossesive(user?.name)} Notes App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            {user !== undefined && (
              <Tooltip title={AddPossesive(user?.name) + ' Profile'}>
                <IconButton sx={{ p: 0 }} onClick={() => navigate('/profile')}>
                  <Avatar alt={user.name} src={user.avatar} />
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
