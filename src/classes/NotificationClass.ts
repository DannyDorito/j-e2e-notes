export class NotificationClass {
  open: boolean;
  autoHideDuration: number;
  severity: 'error' | 'warning' | 'info' | 'success';
  content: string;

  constructor(
    autoHideDuration: number | undefined,
    severity: 'error' | 'warning' | 'info' | 'success' | undefined,
    content: string,
  ) {
    this.open = true;
    this.autoHideDuration = autoHideDuration ?? 5000;
    this.severity = severity ?? 'info';
    this.content = content;
  }
}
