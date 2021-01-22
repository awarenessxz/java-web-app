import { IHash, SelectOption } from './FilterMultiSelect.types';

// filter options by filter text
export const filterOptions = (filter: string, options: SelectOption[]): SelectOption[] => {
    const mFilter = filter.toUpperCase();
    const mFilteredOptions: SelectOption[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
        if (!mFilter || options[i].value.toUpperCase().indexOf(mFilter) !== -1) {
            mFilteredOptions.push(options[i]);
        }
    }
    return mFilteredOptions;
};

interface ProcessSelectedOptionsResult {
    visible: SelectOption[];
    hidden: SelectOption[];
}

// split selected options into hidden selected options and visible selected options
export const processSelectedOptions = (
    selectedOptions: SelectOption[],
    filteredOptions: SelectOption[],
): ProcessSelectedOptionsResult => {
    const visibleSelectedOptions: SelectOption[] = [];
    const hiddenSelectedOptions: SelectOption[] = [];
    selectedOptions.forEach((option) => {
        let found = false;
        for (let i = 0; i < filteredOptions.length; i += 1) {
            if (filteredOptions[i].key === option.key) {
                found = true;
                break;
            }
        }
        if (found) {
            visibleSelectedOptions.push(option);
        } else {
            hiddenSelectedOptions.push(option);
        }
    });
    return { visible: visibleSelectedOptions, hidden: hiddenSelectedOptions };
};

// get hash map of selected Options
export const convertSelectedOptionsToHashmap = (options: SelectOption[]): IHash =>
    Object.assign({}, ...options.map((option) => ({ [option.key]: option.value }))) as IHash;

// check if selected options is updated
export const isSelectedOptionsUpdated = (original: SelectOption[], newOptions: SelectOption[]): boolean => {
    const keysA = original.map((option) => option.key);
    const keysB = newOptions.map((option) => option.key);
    return String(keysA) !== String(keysB);
};
