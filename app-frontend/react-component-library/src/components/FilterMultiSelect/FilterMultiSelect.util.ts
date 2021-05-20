import { SelectOption, SelectedOptions } from './FilterMultiSelect.types';

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

// split selected options into hidden selected options and visible selected options
export const processSelectedOptions = (
    selectedOptions: SelectOption[],
    filteredOptions: SelectOption[],
): SelectedOptions => {
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
