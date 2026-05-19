// hooks/useModals.js
import { useModal } from './useModal';

export const useModals = () => {
  const victory = useModal();
  const help = useModal();

  return { victory, help };
};