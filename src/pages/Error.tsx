import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { backgroundColour, textColour, primary } from '../helpers/ThemeProvider';
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import { useNavigate } from 'react-router-dom';
const Error = () => {
  window.localStorage.clear();
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          flexDirection: 'column',
          backgroundColor: backgroundColour,
        }}
      >
        <Typography textAlign='center' variant='h4' sx={{ color: textColour }}>
          404 Not Found!
        </Typography>
        <Tooltip title='Return'>
          <IconButton className='error-return' onClick={() => navigate('/')}>
            <ArrowBackIosNewTwoToneIcon sx={{ color: primary }} />{' '}
            <Typography textAlign='center' variant='body1' sx={{ color: textColour }}>
              Go Back
            </Typography>
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};

export default Error;
