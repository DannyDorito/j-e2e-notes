import { useState } from 'react';
import { v4 as uuidv4, version as uuidVersion, validate as uuidValidate, NIL as NIL_UUID } from 'uuid';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import Notes from './Notes';
import './css/Login.css';

const Login = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [userUUID, setUserUUID] = useState<string>(NIL_UUID)
  const authenticate = () => {
    setAuthenticated(!authenticated);
    setUserUUID(uuidv4());
  };

  const validUUID = (uuid: string) => {
    return uuid !== NIL_UUID && uuidValidate(uuid) && uuidVersion(uuid) === 4;
  }

  if (!authenticated && !validUUID(userUUID)) {
    return (
      <>
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          alignItems='center'
          justifyContent='center'
        >
          <Button onClick={authenticate}>Login</Button>
        </Box>
      </>
    );
  } else {
    return <Notes />;
  }
};

export default Login;
