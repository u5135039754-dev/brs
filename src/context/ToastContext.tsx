import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { Toast } from './Toast';

export type ToastType = 'success' | 'error' | 'info';

interface ToastState {
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const TOAST_DURATION_MS = 4000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToast(null);
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToast({ message, type });
    timeoutRef.current = setTimeout(() => setToast(null), TOAST_DURATION_MS);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={dismiss} />}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
