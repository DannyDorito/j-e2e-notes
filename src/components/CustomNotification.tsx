import { useState } from 'react';
import { NotificationClass } from '../classes/NotificationClass';
import Alert from '@mui/material/Alert/Alert';
import Snackbar from '@mui/material/Snackbar/Snackbar';

const CustomNotification = ({ props }: { props: NotificationClass }) => {
  const [notificationOpen, setNotificationOpen] = useState<boolean>(props.open);
  const [notificationAutoHideDuration] = useState<number>(props.autoHideDuration);
  const [notificationSeverity] = useState<'error' | 'warning' | 'info' | 'success'>(props.severity);
  const [alertContent] = useState<string>(props.content);

  return (
    <Snackbar
      autoHideDuration={notificationAutoHideDuration}
      open={notificationOpen}
      onClose={() => setNotificationOpen(false)}
    >
      <Alert
        severity={notificationSeverity}
        onClose={() => setNotificationOpen(false)}
        sx={{
          width: '100%',
        }}
      >
        {alertContent}
      </Alert>
    </Snackbar>
  );
};

export default CustomNotification;
