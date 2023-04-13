import { useLocalStorage } from 'usehooks-ts';
import { UserClass, defaultUser } from '../classes/UserClass';
import { NIL as NIL_UUID } from 'uuid';
import { primary } from '../helpers/ThemeProvider';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Tooltip,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';

const pages: string[] = [];

const NoteMenu = () => {
  const navigate = useNavigate();

  const [user] = useLocalStorage<UserClass>('user', defaultUser);

  return (
    <AppBar position='static' sx={{ backgroundColor: primary }}>
      <Container maxWidth='xl'>
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/notes'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            J E2E Notes App
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
            variant='h5'
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
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page} sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={user.name + "'s Profile"}>
              <IconButton sx={{ p: 0 }} onClick={() => navigate('/profile')}>
                <Avatar alt={user.name} src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NoteMenu;
