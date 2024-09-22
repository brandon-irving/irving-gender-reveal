import { useEffect, useState } from "react";

function useLocalStorage(key: string, initialValue: string | null = null) {
  const [storedValue, setStoredValue] = useState<string | null>(null);

  useEffect(() => {
    // Only runs in the browser
    if (typeof window !== "undefined") {
      const value = localStorage.getItem(key);
      setStoredValue(value || initialValue);
    }
  }, [key, initialValue]);

  // Save to localStorage
  const setValue = (value: string) => {
    setStoredValue(value);
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  };

  return [storedValue, setValue, typeof window === "undefined"] as const;
}

export default useLocalStorage;
