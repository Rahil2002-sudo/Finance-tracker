import { useState, useEffect } from 'react';

function getStorageValue<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    const saved = localStorage.getItem(key);
    const initial = saved !== null ? JSON.parse(saved) : defaultValue;
    return initial;
}

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
    const [value, setValue] = useState<T>(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
};
