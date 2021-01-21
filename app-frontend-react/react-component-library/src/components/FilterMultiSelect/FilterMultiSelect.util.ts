import { SelectOption } from './FilterMultiSelect.types';

// function to filter options by filter text
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

// check if selected options is updated
export const isSelectedOptionsUpdated = (original: SelectOption[], newOptions: SelectOption[]): boolean => {
    const keysA = original.map((option) => option.key);
    const keysB = newOptions.map((option) => option.key);
    return String(keysA) !== String(keysB);
};
