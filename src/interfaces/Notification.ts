export interface Notification {
  open: boolean;
  autoHideDuration: number;
  severity: 'error' | 'warning' | 'info' | 'success';
  content: string;
}
