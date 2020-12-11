import { useState } from 'react';

const useLocalStorageState = (key: string, defaultValue?: string): [string | null, (newValue: string) => void] => {
    if (localStorage.getItem(key) === null && defaultValue) {
        localStorage.setItem(key, defaultValue); // initializing
    }
    const [value, setValue] = useState(localStorage.getItem(key));

    const setValueInLocalStorage = (newValue: string): void => {
        setValue(newValue);
    };

    return [value, setValueInLocalStorage];
};

export default useLocalStorageState;
