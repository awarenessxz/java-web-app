import React, { useState } from 'react';
import FilterMultiSelect from '../FilterMultiSelect/FilterMultiSelect';
import { ItemProps, TransferListProps } from './TransferList.types';
import { SelectOption } from '../FilterMultiSelect/FilterMultiSelect.types';
import { containsSelectedOptionInList, initList } from './TransferList.util';
import styles from './TransferList.module.scss';

/**
 * TransferList
 */
const TransferList = ({
    options = [],
    selectedOptions = [],
    onTransfer,
    leftListTitle = 'Source',
    rightListTitle = 'Destination',
    showFilter = false,
    disabled = false,
}: TransferListProps): JSX.Element => {
    const [leftList, setLeftList] = useState<SelectOption[]>(initList(selectedOptions, options));
    const [leftSelected, setLeftSelected] = useState<SelectOption[]>([]);
    const [rightList, setRightList] = useState<SelectOption[]>(initList([], selectedOptions));
    const [rightSelected, setRightSelected] = useState<SelectOption[]>([]);

    const handleSelectChange = (selection: SelectOption[], isSourceList: boolean): void => {
        if (isSourceList) {
            setLeftSelected(selection);
        } else {
            setRightSelected(selection);
        }
    };

    const updateSourceAndDestinationList = (selection: SelectOption[]): void => {
        const newLeftList = initList(selection, options);
        const newRightList = initList([], selection);
        setLeftList(newLeftList);
        setRightList(newRightList);
        onTransfer(newLeftList, newRightList);
    };

    const addSelectionToRightList = (): void => {
        const newSelectedOptions = rightList.concat(leftSelected);
        setLeftSelected([]);
        updateSourceAndDestinationList(newSelectedOptions);
    };

    const addSelectionToLeftList = (): void => {
        const newSelectedOptions = rightList.filter((e1) => !containsSelectedOptionInList(rightSelected, e1));
        setRightSelected([]);
        updateSourceAndDestinationList(newSelectedOptions);
    };

    const Item = (innerProps: ItemProps): JSX.Element => (
        <div className={styles.item}>
            <div className={`${styles.item_content} ${styles.item_wrapper}`}>{innerProps.children}</div>
        </div>
    );

    return (
        <div className={`${styles.wrapper} ${styles.item_wrapper}`}>
            <Item>
                <FilterMultiSelect
                    data-testid="filtermultiselect-left"
                    title={leftListTitle}
                    options={leftList}
                    selectedOptions={leftSelected}
                    onMultiSelectChange={(selected): void => handleSelectChange(selected, true)}
                    showFilter={showFilter}
                    disabled={disabled}
                />
            </Item>
            <Item>
                <button onClick={addSelectionToRightList} disabled={disabled}>
                    &gt;
                </button>
                <button onClick={addSelectionToLeftList} disabled={disabled}>
                    &lt;
                </button>
            </Item>
            <Item>
                <FilterMultiSelect
                    data-testid="filtermultiselect-right"
                    title={rightListTitle}
                    options={rightList}
                    selectedOptions={rightSelected}
                    onMultiSelectChange={(selected): void => handleSelectChange(selected, false)}
                    showFilter={showFilter}
                    disabled={disabled}
                />
            </Item>
        </div>
    );
};

export default TransferList;
