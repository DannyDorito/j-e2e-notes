import { Link, Typography } from '@mui/material';
import { primary } from '../helpers/ThemeProvider';

const Copyright = () => {
  return (
    <Typography variant='body2' align='center' sx={{ color: primary }}>
      {'Copyright © '}
      <Link color='inherit' href='https://jallison.co.uk' target='_blank' rel='noopener noreferrer'>
        John Allison
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
