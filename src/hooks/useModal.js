import { useCallback, useState } from "react"

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const open = useCallback((modalData = null) => {
    setData(modalData);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    // console.trace("close() called")
    setIsOpen(false);
    setData(null);
  }, []);

  return { isOpen, data, open, close };
};