import { useState } from 'react';
import { backgroundColour, primary } from '../helpers/ThemeProvider';
import {
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useLocalStorage } from 'usehooks-ts';
import { LoginProps } from '../props/LoginProps';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import './css/Login.css';
import Copyright from '../components/Copyright';

const Login = ({ props }: { props: LoginProps }) => {
  const [username, setUsername] = useLocalStorage('username', '');
  const [password, setPassword] = useState<string>('');

  const login = () => {
    if (username === '' || password === '') {
      return;
    } else {
      props.authenticate();
    }
  };

  return (
    <>
      <Grid
        container
        component='main'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: backgroundColour,
        }}
        alignItems='center'
        justifyContent='center'
      >
        <form noValidate>
          <TextField
            onChange={(event) => setUsername(event.target.value)}
            variant='standard'
            margin='normal'
            multiline={false}
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoFocus
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: primary,
              },
              WebkitTextFillColor: primary,
            }}
          />
          <TextField
            onChange={(event) => setPassword(event.target.value)}
            variant='standard'
            margin='normal'
            multiline={false}
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: primary,
              },
              WebkitTextFillColor: primary,
            }}
          />
          <FormControlLabel
            control={<Switch edge='end' />}
            label='Remember me'
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: primary,
              },
              WebkitTextFillColor: primary,
            }}
          />
        </form>
        <Link href='#' variant='body2' sx={{ color: primary }}>
          {"Don't have an account? Sign Up"}
        </Link>
        <IconButton size='large' sx={{ color: primary }} onClick={login}>
          <LoginTwoToneIcon />
          <Typography variant='body1'>Sign In</Typography>
        </IconButton>
        <Copyright />
      </Grid>
    </>
  );
};

export default Login;
