import { useState } from 'react';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import Notes from './Notes';
import './css/Login.css';

const Login = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const authenticate = () => {
    setAuthenticated(!authenticated);
  };

  if (!authenticated) {
    return (
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        alignItems='center'
        justifyContent='center'
      >
        <Button onClick={authenticate}>Login</Button>
      </Box>
    );
  } else {
    return <Notes />;
  }
};

export default Login;
