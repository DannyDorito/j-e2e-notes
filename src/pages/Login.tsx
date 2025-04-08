import { useState } from 'react';
import { useDarkMode, useLocalStorage } from 'usehooks-ts';
import {
  backgroundColour,
  invertedBackgroundColour,
  invertedTextColour,
  primary,
} from '../helpers/ThemeProvider';
import {
  Avatar,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Turnstile } from '@marsidev/react-turnstile';
import { LoginProps } from '../props/LoginProps';
import Copyright from '../components/Copyright';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone';
import LockPersonTwoToneIcon from '@mui/icons-material/LockPersonTwoTone';
import './css/Login.css';

const Login = ({ props }: { props: LoginProps }) => {
  const [rememberMe, setRememberMe] = useLocalStorage<boolean>('rememberMe', false);

  const [username, setUsername] = useState<string>(() => {
    if (rememberMe) {
      const savedUsername = localStorage.getItem('username');
      return savedUsername || 'admin';
    } else {
      return 'admin';
    }
  });
  const [usernameError, setUsernameError] = useState<string>('');

  const [password, setPassword] = useState<string>('admin');
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const [showTurnstileCaptcha, setShowTurnstileCaptcha] = useState<boolean>(false);
  const [turnstileCaptchaComplete, setTurnstileCaptchaComplete] = useState<boolean>(false);
  const [turnstileCaptchaError, setTurnstileCaptchaError] = useState<string>('');

  const [turnstileSiteKey] = useState<string>(process.env.REACT_APP_TURNSTILE_SITE_KEY || '');
  const { isDarkMode } = useDarkMode();

  const updateUsername = (username: string) => {
    if (!username) {
      setUsernameError('Error: Please enter a username.');
    } else {
      setUsernameError('');
      setUsername(username);
      if (rememberMe) {
        localStorage.setItem('username', username);
      }
    }
  };

  const updatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Error: Please enter a password!');
    } else {
      setPasswordError('');
      setPassword(password);
    }
  };

  const login = () => {
    if (!username) {
      setUsernameError('Error: Please enter a username!');
      return;
    }
    if (!password) {
      setPasswordError('Error: Please enter a password!');
      return;
    }
    if (!turnstileCaptchaComplete) {
      setShowTurnstileCaptcha(true);
      return;
    }
    props.authenticate();
  };

  const turnstileSuccess = () => {
    setTurnstileCaptchaComplete(true);
    props.authenticate();
  };

  const turnstileExpire = () => {
    setTurnstileCaptchaError('Error: Captcha Expired, please try again!');
  };

  const turnstileError = () => {
    setTurnstileCaptchaError('Error: Captcha Error, please try again!');
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
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: invertedBackgroundColour,
            border: '50px solid',
            borderColor: invertedBackgroundColour,
            maxWidth: '450px',
          }}
        >
          <Avatar sx={{ backgroundColor: primary }}>
            <LockPersonTwoToneIcon />
          </Avatar>
          <Typography component='h1' variant='h5' sx={{ WebkitTextFillColor: invertedTextColour }}>
            Sign in
          </Typography>
          <form noValidate>
            <TextField
              onChange={(event) => updateUsername(event.target.value)}
              variant='standard'
              margin='normal'
              multiline={false}
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoFocus
              value={username}
              error={usernameError.length !== 0}
              helperText={usernameError}
              sx={{
                WebkitTextFillColor: invertedTextColour,
              }}
            />
            <TextField
              onChange={(event) => updatePassword(event.target.value)}
              variant='standard'
              margin='normal'
              multiline={false}
              required
              fullWidth
              name='password'
              label='Password'
              type={passwordVisible ? 'text' : 'password'}
              id='password'
              autoComplete='current-password'
              value={password}
              error={passwordError.length !== 0}
              helperText={passwordError}
              sx={{
                WebkitTextFillColor: invertedTextColour,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      size='large'
                      sx={{ color: primary }}
                      aria-label='toggle password visibility'
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      onMouseDown={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <VisibilityTwoToneIcon /> : <VisibilityOffTwoToneIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {showTurnstileCaptcha ? (
              <FormControl
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Turnstile
                  siteKey={turnstileSiteKey}
                  onSuccess={turnstileSuccess}
                  onError={turnstileError}
                  onExpire={turnstileExpire}
                  options={{
                    theme: isDarkMode ? 'light' : 'dark',
                  }}
                />
                {turnstileCaptchaError.length !== 0 && (
                  <FormHelperText>{turnstileCaptchaError}</FormHelperText>
                )}
              </FormControl>
            ) : (
              <div></div>
            )}
          </form>
          <FormControlLabel
            control={
              <Checkbox
                id='rememberMe'
                value='rememberMe'
                checked={rememberMe}
                onChange={(_, checked) => setRememberMe(checked)}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: invertedTextColour,
                }}
              />
            }
            label={
              <Typography variant='body1' sx={{ color: invertedTextColour }}>
                Remember Me
              </Typography>
            }
          />
          <IconButton size='large' sx={{ color: primary }} onClick={login}>
            <LoginTwoToneIcon />
            <Typography variant='body1' sx={{ color: invertedTextColour }}>
              Sign In
            </Typography>
          </IconButton>
          <IconButton size='large' sx={{ color: primary }} onClick={() => console.log('sign up')}>
            <PersonAddTwoToneIcon />
            <Typography variant='body1' sx={{ color: invertedTextColour }}>
              Sign Up
            </Typography>
          </IconButton>
          <Copyright />
        </Box>
      </Grid>
    </>
  );
};

export default Login;
