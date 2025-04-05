import { useState, useCallback } from 'react';

type UseToggleReturn = [boolean, () => void, (value: boolean) => void];

/**
 * A custom hook for toggle functionality
 * @param initialState - The initial state of the toggle
 * @returns A tuple containing the current state, a toggle function, and a setter function
 */
export function useToggle(initialState = false): UseToggleReturn {
  const [state, setState] = useState<boolean>(initialState);
  
  const toggle = useCallback(() => {
    setState(prevState => !prevState);
  }, []);
  
  const setter = useCallback((value: boolean) => {
    setState(value);
  }, []);
  
  return [state, toggle, setter];
}

export default useToggle;
