import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FilterMultiSelectProps, SelectOption } from './FilterMultiSelect.types';
import { filterOptions, processSelectedOptions } from './FilterMultiSelect.util';
import styles from './FilterMultiSelect.module.scss';

/**
 * FilterMultiSelect
 */
const FilterMultiSelect = ({
    options = [],
    selectedOptions = [],
    onMultiSelectChange,
    title = undefined,
    defaultFilter = '',
    filterPlaceHolder = 'type to filter',
    showFilter = false,
    disabled = false,
}: FilterMultiSelectProps): JSX.Element => {
    const [mFilter, setmFilter] = useState(defaultFilter);
    const [mFilteredOptions, setmFilteredOptions] = useState<SelectOption[]>([]); // keeps track of current visible options
    const [mSelectedOptions, setmSelectedOptions] = useState<SelectOption[]>([]); // keeps track of current visible selected options
    const [mHiddenSelectedOptions, setmHiddenSelectedOptions] = useState<SelectOption[]>([]); // keeps track of selected options that are filtered away
    const checkboxAllRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);

    // init on first load
    useEffect(() => {
        const filteredOptions = filterOptions(defaultFilter, options);
        const { visible, hidden } = processSelectedOptions(selectedOptions, filteredOptions);
        setmFilteredOptions(filteredOptions);
        setmSelectedOptions(visible);
        setmHiddenSelectedOptions(hidden);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // callback for selection change
    const handleSelectChangeCallback = (): void => {
        const totalSelectedOptions = [...mSelectedOptions, ...mHiddenSelectedOptions];
        onMultiSelectChange(totalSelectedOptions);
    };

    // update checkbox ui check state
    const updateCheckboxState = (): void => {
        if (checkboxAllRef && checkboxAllRef.current) {
            checkboxAllRef.current.checked = mSelectedOptions.length + mHiddenSelectedOptions.length === options.length;
        }
    };

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        const newSelectedOptions: SelectOption[] = [];
        Array.from(e.target.selectedOptions, (option) => {
            newSelectedOptions.push({
                key: option.value,
                value: option.text,
            });
            return option.value; // not used
        });

        // update state
        setmSelectedOptions(newSelectedOptions);
        updateCheckboxState();
        handleSelectChangeCallback();
    };

    const onCheckAllToggle = (e: ChangeEvent<HTMLInputElement>): void => {
        const { checked } = e.target;
        if (checked) {
            if (selectRef && selectRef.current) {
                // add those visible non-selected options to selected
                const newSelectedOptions: SelectOption[] = [];
                for (let i = 0, l = selectRef.current.options.length; i < l; i += 1) {
                    if (!selectRef.current.options[i].selected) {
                        newSelectedOptions.push({
                            key: selectRef.current.options[i].value,
                            value: selectRef.current.options[i].text,
                        });
                    }
                }
                setmSelectedOptions([...mSelectedOptions, ...newSelectedOptions]);
                handleSelectChangeCallback();
            }
        } else {
            // remove all selected options
            setmSelectedOptions([]);
            handleSelectChangeCallback();
        }
    };

    const onFilterChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const filter = e.target.value;
        const filteredOptions = filterOptions(filter, options);
        const allSelectedOptions = [...mSelectedOptions, ...mHiddenSelectedOptions];
        const { visible, hidden } = processSelectedOptions(allSelectedOptions, filteredOptions);
        setmFilter(filter);
        setmFilteredOptions(filteredOptions);
        setmSelectedOptions(visible);
        setmHiddenSelectedOptions(hidden);
        updateCheckboxState();
    };

    return (
        <div className={styles.card}>
            <div className={styles.card_header}>
                <div className={styles.header_checkbox}>
                    <input ref={checkboxAllRef} type="checkbox" onChange={onCheckAllToggle} disabled={disabled} />
                </div>
                <div className={styles.header_content}>
                    <span>{title}</span>
                    <span className={styles.text_secondary}>
                        {mSelectedOptions.length + mHiddenSelectedOptions.length}/{options.length} selected
                    </span>
                </div>
            </div>
            <hr className={styles.divider} />
            <div className={styles.card_content}>
                {showFilter && (
                    <input
                        type="text"
                        placeholder={filterPlaceHolder}
                        className={styles.content_form_control}
                        onChange={onFilterChange}
                        value={mFilter}
                        disabled={disabled}
                    />
                )}
                <select
                    multiple
                    ref={selectRef}
                    className={styles.content_form_control}
                    onChange={onSelectChange}
                    size={mFilteredOptions.length}
                    value={mSelectedOptions.map((option) => option.key)}
                    disabled={disabled}
                >
                    {mFilteredOptions.map((option) => {
                        return (
                            <option key={option.key} value={option.key}>
                                {option.value}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};

export default FilterMultiSelect;
