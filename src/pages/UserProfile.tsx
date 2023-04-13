import { Box, List, ListItem, ListItemIcon, ListItemText, Switch, Typography } from '@mui/material';
import { ProfileProps } from '../props/ProfileProps';
import { white } from '../helpers/ThemeProvider';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
const UserProfile = ({ props }: { props: ProfileProps }) => {
  const toggleOption = (checked: boolean, option: 'showNotifications') => {
    const updatedUser = props.user;
    switch (option) {
      case 'showNotifications':
        updatedUser.options.showNotifications = checked;
        props.setUser(updatedUser);
        break;

      default:
        break;
    }
  }
  return (
    <>
      <Box sx={{ backgroundColor: white, height: '100vh', textAlign:'center' }}>
        <Typography variant='body1'>
          {`${props.user.name}'s Profile`}
        </Typography>
        <List sx={{width: '80%', display: 'flex', justifyContent: 'center', flexDirection:'row', maxWidth: 360}}>
          <ListItem>
          <ListItemIcon>
            <NotificationsActiveTwoToneIcon />
        </ListItemIcon>
        <ListItemText primary='Show Notifications' />
        <Switch
          edge="end"
          onChange={(event) => toggleOption(event.target.checked, 'showNotifications')}
          checked={props.user.options.showNotifications}
        />
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default UserProfile;
