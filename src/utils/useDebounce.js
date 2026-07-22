import { useEffect, useState } from "react";

/**
 * Custom hook that debounces a value. Basicaly it waits for the user to stop
 * typing before actually updating the value
 * @param {any} value - the value to debounce
 * @param {number} delay - delay in miliseconds
 * @returns {any} the debounced value
 */
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // set a timer to update the value after delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup the timer if value changes before delay is over
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}