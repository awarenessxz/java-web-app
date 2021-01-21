import React, { ChangeEvent, useRef, useState } from 'react';
import { FilterMultiSelectProps } from './FilterMultiSelect.types';
import { filterOptions, isSelectedOptionsUpdated } from './FilterMultiSelect.util';
import styles from './FilterMultiSelect.module.scss';

/**
 * FilterMultiSelect
 */
const FilterMultiSelect = ({
    options = [],
    selectedOptions = [],
    onSelectChange,
    title = undefined,
    defaultFilter = '',
    filterPlaceHolder = 'type to filter',
    showFilter = false,
    disabled = false,
}: FilterMultiSelectProps): JSX.Element => {
    const [mFilter, setmFilter] = useState(defaultFilter);
    const [mFilteredOptions, setmFilteredOptions] = useState(filterOptions(defaultFilter, options));
    const [mSelectedOptions, setmSelectedOptions] = useState(selectedOptions);
    const checkboxAllRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);

    const updateSelectedValue = (e?: ChangeEvent<HTMLSelectElement>): void => {
        const el = e ? e.target : selectRef.current;
        if (el) {
            const newSelectedOptions = [];
            for (let i = 0, l = el.options.length; i < l; i += 1) {
                if (el.options[i].selected) {
                    newSelectedOptions.push({
                        key: el.options[i].value,
                        value: el.options[i].text,
                    });
                }
            }
            if (checkboxAllRef && checkboxAllRef.current) {
                checkboxAllRef.current.checked = newSelectedOptions.length === el.options.length;
            }

            // Always update if we were handling an event, otherwise only update if selectedValues has actually changed.
            if (e || isSelectedOptionsUpdated(mSelectedOptions, newSelectedOptions)) {
                setmSelectedOptions(newSelectedOptions);
                onSelectChange(newSelectedOptions);
            }
        }
    };

    const onCheckAllToggle = (e: ChangeEvent<HTMLInputElement>): void => {
        const { checked } = e.target;
        if (checked) {
            if (selectRef && selectRef.current) {
                for (let i = 0, l = selectRef.current.options.length; i < l; i += 1) {
                    selectRef.current.options[i].selected = checked;
                }
            }
        } else {
            setmSelectedOptions([]);
        }
    };

    const onFilterChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const filter = e.target.value;
        setmFilter(filter);
        setmFilteredOptions(filterOptions(filter, options));
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
                        {mSelectedOptions.length}/{options.length} selected
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
                    onChange={updateSelectedValue}
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
