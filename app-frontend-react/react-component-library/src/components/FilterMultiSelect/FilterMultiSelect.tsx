import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FilterMultiSelectProps, SelectOption, SelectedOptions } from './FilterMultiSelect.types';
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
    showFilter = true,
    disabled = false,
    ...props
}: FilterMultiSelectProps): JSX.Element => {
    const [mFilter, setmFilter] = useState(defaultFilter);
    const [mFilteredOptions, setmFilteredOptions] = useState<SelectOption[]>([]); // keeps track of current visible options
    const [mSelectedOptions, setmSelectedOptions] = useState<SelectedOptions>({
        visible: [], // keeps track of current visible selected options
        hidden: [], // keeps track of selected options that are hidden away due to filter
    });
    const checkboxAllRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);
    const triggerMultiChange = useRef(false);

    // init on first load
    useEffect(() => {
        const filteredOptions = filterOptions(defaultFilter, options);
        const { visible, hidden } = processSelectedOptions(selectedOptions, filteredOptions);
        setmFilteredOptions(filteredOptions);
        setmSelectedOptions({ visible, hidden });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // update checkbox ui check state
    const updateCheckboxState = (): void => {
        if (checkboxAllRef && checkboxAllRef.current) {
            const selectedLength = mSelectedOptions.visible.length + mSelectedOptions.hidden.length;
            checkboxAllRef.current.checked = selectedLength === options.length;
        }
    };

    // trigger this whenever selected options is updated
    useEffect(() => {
        // only useEffect when the component have been init
        if (triggerMultiChange.current) {
            // callback when selection change
            const totalSelectedOptions = [...mSelectedOptions.visible, ...mSelectedOptions.hidden];
            onMultiSelectChange(totalSelectedOptions);
            triggerMultiChange.current = false;
        }
        updateCheckboxState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mSelectedOptions]);

    // handle selection changes
    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        const newSelectedOptions: SelectOption[] = [];
        Array.from(e.target.selectedOptions, (option) => {
            newSelectedOptions.push({
                key: option.value,
                value: option.text,
            });
            return option.value; // not used
        });

        // update state (trigger effect)
        triggerMultiChange.current = true;
        setmSelectedOptions({ ...mSelectedOptions, visible: newSelectedOptions });
    };

    // handle checkbox changes
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
                // update state (trigger effect)
                triggerMultiChange.current = true;
                setmSelectedOptions({
                    ...mSelectedOptions,
                    visible: [...mSelectedOptions.visible, ...newSelectedOptions],
                });
            }
        } else {
            // remove all selected options, update state (trigger effect)
            triggerMultiChange.current = true;
            setmSelectedOptions({ ...mSelectedOptions, visible: [] });
        }
    };

    const onFilterChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const filter = e.target.value;
        const filteredOptions = filterOptions(filter, options);
        const allSelectedOptions = [...mSelectedOptions.visible, ...mSelectedOptions.hidden];
        const { visible, hidden } = processSelectedOptions(allSelectedOptions, filteredOptions);
        setmFilter(filter);
        setmFilteredOptions(filteredOptions);
        setmSelectedOptions({ visible, hidden });
    };

    return (
        <div className={styles.card} {...props}>
            <div className={styles.card_header}>
                <div className={styles.header_checkbox}>
                    <input
                        ref={checkboxAllRef}
                        data-testid="input-checkbox"
                        type="checkbox"
                        onChange={onCheckAllToggle}
                        disabled={disabled}
                    />
                </div>
                <div className={styles.header_content}>
                    <span>{title}</span>
                    <span className={styles.text_secondary}>
                        {mSelectedOptions.visible.length + mSelectedOptions.hidden.length}/{options.length} selected
                    </span>
                </div>
            </div>
            <hr className={styles.divider} />
            <div className={styles.card_content}>
                {showFilter && (
                    <input
                        type="text"
                        data-testid="input-filter"
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
                    data-testid="select-multiple"
                    className={styles.content_form_control}
                    onChange={onSelectChange}
                    size={mFilteredOptions.length}
                    value={mSelectedOptions.visible.map((option) => option.key)}
                    disabled={disabled}
                >
                    {mFilteredOptions.map((option) => {
                        return (
                            <option data-testid="select-multiple-option" key={option.key} value={option.key}>
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
