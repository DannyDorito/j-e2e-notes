import Box from '@mui/material/Box/Box';
import { white } from '../helpers/ThemeProvider';

const Error = () => {
  if (process.env.NODE_ENV !== 'production') {
    window.localStorage.clear();
  }
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
