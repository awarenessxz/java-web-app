import { useState } from 'react';

const useLocalStorageState = (key: string, defaultValue?: string): [string | null, (newValue: string) => void] => {
    if (localStorage.getItem(key) === null && defaultValue) {
        localStorage.setItem(key, defaultValue); // initializing
    }
    const [value, setValue] = useState<string | null>(localStorage.getItem(key));

    const setValueInLocalStorage = (newValue: string): void => {
        setValue(newValue);
        localStorage.setItem(key, newValue);
    };

    return [value, setValueInLocalStorage];
};

export default useLocalStorageState;
