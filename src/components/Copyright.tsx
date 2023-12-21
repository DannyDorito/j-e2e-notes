import { Link, Typography } from '@mui/material';
import { primary } from '../helpers/ThemeProvider';

const Copyright = () => {
  return (
    <>
      <Typography variant='body2' align='center' sx={{ color: primary, paddingTop: '50px' }}>
        <Link
          color='inherit'
          href='https://jallison.co.uk'
          target='_blank'
          rel='noopener noreferrer'
        >
          John&nbsp;Allison
        </Link>{' '}
        {new Date().getFullYear()}
        {','}&nbsp;
        <Link
          color='inherit'
          href='https://github.com/DannyDorito/j-e2e-notes'
          target='_blank'
          rel='noopener noreferrer'
        >
          GitHub Repo
        </Link>
        {'.'}
      </Typography>
    </>
  );
};

export default Copyright;
