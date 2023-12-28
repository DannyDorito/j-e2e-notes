import { Grid, Typography } from '@mui/material';
import { DeletedArchivedNotesProps } from '../props/DeletedArchivedNotesProps';
import { backgroundColour, textColour } from '../helpers/ThemeProvider';

const DeletedArchivedNotes = ({ props }: { props: DeletedArchivedNotesProps }) => {
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
        <Typography variant='h6' sx={{ color: textColour }}>
          {props.type} Notes
        </Typography>
      </Grid>
    </>
  );
};

export default DeletedArchivedNotes;
