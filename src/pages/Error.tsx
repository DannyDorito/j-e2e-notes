import { Box } from '@mui/material';
import { backgroundColour } from '../helpers/ThemeProvider';

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
          backgroundColor: backgroundColour,
        }}
        alignItems='center'
        justifyContent='center'
      ></Box>
    </>
  );
};

export default Error;
