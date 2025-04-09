import { useEffect, useState } from "react";
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const initialValue_function = () => {
    let jsonValue;
    if (typeof localStorage !== "undefined") {
      jsonValue = localStorage.getItem(key);
      if (jsonValue != null) return JSON.parse(jsonValue);
    }
    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  };

  const [value, setValue] = useState<T>(() => initialValue_function());

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
