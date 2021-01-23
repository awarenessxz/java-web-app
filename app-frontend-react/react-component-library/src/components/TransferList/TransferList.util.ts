import { SelectOption } from '../FilterMultiSelect/FilterMultiSelect.types';
import { BooleanHashMap } from './TransferList.types';

// create a lookup map for selected options
const makeLookup = (selectedOptions: SelectOption[]): BooleanHashMap => {
    const lkup: BooleanHashMap = {};
    for (let i = 0, l = selectedOptions.length; i < l; i += 1) {
        lkup[selectedOptions[i].key] = true;
    }
    return lkup;
};

// initialize TransferList
export const initList = (selectedOptions: SelectOption[], options: SelectOption[]): SelectOption[] => {
    const selectedValueLookup = makeLookup(selectedOptions);
    const newOptions: SelectOption[] = [];

    for (let i = 0, l = options.length; i < l; i += 1) {
        if (!selectedValueLookup[options[i].key]) {
            newOptions.push(options[i]);
        }
    }
    return newOptions;
};

// checks if SelectOption can be found in SelectOption Array
export const containsSelectedOptionInList = (list: SelectOption[], option: SelectOption): boolean => {
    let found = false;
    for (let i = 0; i < list.length; i++) {
        if (list[i].key === option.key) {
            found = true;
            break;
        }
    }
    return found;
};
