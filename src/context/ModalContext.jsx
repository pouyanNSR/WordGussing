// contexts/ModalContext.jsx
import { createContext, useContext } from 'react';
import { useModals } from '../hooks/useModals';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const modals = useModals(); // یکبار هوک فراخوانی می‌شود و stateها اینجا زندگی می‌کنند

  return (
    <ModalContext.Provider value={modals}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModalContext = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModalContext must be used within ModalProvider');
  return ctx;
};