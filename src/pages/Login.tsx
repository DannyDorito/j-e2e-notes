import { primary, white } from '../helpers/ThemeProvider';
import { Box, IconButton, Typography } from '@mui/material';
import { LoginProps } from '../props/LoginProps';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import './css/Login.css';

const Login = ({ props }: { props: LoginProps }) => {

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: white,
      }}
      alignItems='center'
      justifyContent='center'
    >
      <IconButton size='large' sx={{ color: primary }} onClick={props.authenticate}>
        <LoginTwoToneIcon />
        <Typography variant='body1'>Login</Typography>
      </IconButton>
    </Box>
  );
};

export default Login;
