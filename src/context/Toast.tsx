import type { ToastType } from './ToastContext';
import styles from './Toast.module.scss';

interface ToastProps {
  message: string;
  type: ToastType;
  onDismiss: () => void;
}

export function Toast({ message, type, onDismiss }: ToastProps) {
  return (
    <div className={`${styles.toast} ${styles[type]}`} role="status" aria-live="polite">
      <span className={styles.message}>{message}</span>
      <button type="button" className={styles.dismissButton} onClick={onDismiss} aria-label="Dismiss">
        ×
      </button>
    </div>
  );
}
