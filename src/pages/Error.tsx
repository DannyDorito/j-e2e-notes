import Box from '@mui/material/Box/Box';
import { white } from '../helpers/ThemeProvider';

const Error = () => {
  window.localStorage.clear();

  return (
    <>
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
      ></Box>
    </>
  );
};

export default Error;
