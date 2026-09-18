import { useState, useEffect, useCallback, useRef } from 'react';

export function useLocalStorage<T>(
    key: string,
    initialValue: T,
    delay: number = 1000
) {
    const [data, setData] = useState<T>(initialValue);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const isLoadedRef = useRef<boolean>(false);

    // 1. Simulate async network delay while loading from LocalStorage
    useEffect(() => {
        setIsLoading(true);
        isLoadedRef.current = false;

        const timer = setTimeout(() => {
            try {
                const item = localStorage.getItem(key);
                if (item !== null) {
                    const parsed = JSON.parse(item);
                    setData(parsed);
                } else {
                    // First time initialization in localStorage
                    localStorage.setItem(key, JSON.stringify(initialValue));
                    setData(initialValue);
                }
            } catch (error) {
                console.error(`Error reading localStorage key "${key}":`, error);
                setData(initialValue);
            } finally {
                isLoadedRef.current = true;
                setIsLoading(false);
            }
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [key, delay]);

    // 2. Update state and write changes to LocalStorage
    const setValue = useCallback(
        (value: T | ((prev: T) => T)) => {
            try {
                setData((prev) => {
                    const nextValue =
                        typeof value === 'function'
                            ? (value as (prev: T) => T)(prev)
                            : value;
                    localStorage.setItem(key, JSON.stringify(nextValue));
                    return nextValue;
                });
            } catch (error) {
                console.error(`Error writing to localStorage key "${key}":`, error);
            }
        },
        [key]
    );

    return [data, setValue, isLoading] as const;
}

export default useLocalStorage;
