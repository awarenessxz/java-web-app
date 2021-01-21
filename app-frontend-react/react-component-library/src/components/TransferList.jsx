import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/transferListStyles.module.css';
import FilteredMultiSelectList from './FilteredMultiSelectList';

const makeLookup = (arr, prop) => {
    const lkup = {};
    for (let i = 0, l = arr.length; i < l; i++) {
        if (prop) {
            lkup[arr[i][prop]] = true;
        } else {
            lkup[arr[i]] = true;
        }
    }
    return lkup;
};

const getItemsByProp = (arr, prop, values) => {
    const items = [];
    let found = 0;
    const valuesLookup = makeLookup(values);
    for (let i = 0, la = arr.length, lv = values.length; i < la && found < lv; i++) {
        if (valuesLookup[arr[i][prop]]) {
            items.push(arr[i]);
            found++;
        }
    }
    return items;
};

class TransferList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftList: this._initList(props.selectedOptions, props.options),
            leftSelected: [],
            rightList: this._initList([], props.selectedOptions),
            rightSelected: [],
        };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            nextState.leftList !== this.state.leftList ||
            nextState.rightList !== this.state.rightList
        );
    }

    _initList = (selectedOptions, options) => {
        const { valueProp } = this.props;
        const selectedValueLookup = makeLookup(selectedOptions, valueProp);
        const newOptions = [];

        for (let i = 0, l = options.length; i < l; i++) {
            if (!selectedValueLookup[options[i][valueProp]]) {
                newOptions.push(options[i]);
            }
        }
        return newOptions;
    };

    _addSelectionToRightList = () => {
        const selectedOptions = this.state.rightList.concat(
            getItemsByProp(this.state.leftList, this.props.valueProp, this.state.leftSelected)
        );
        this.setState(
            {
                leftSelected: [],
                leftList: this._initList(selectedOptions, this.props.options),
                rightList: this._initList([], selectedOptions),
            },
            () => {
                this.props.onChange(selectedOptions);
            }
        );
    };

    _addSelectionToLeftList = () => {
        const rightSelection = getItemsByProp(
            this.state.rightList,
            this.props.valueProp,
            this.state.rightSelected
        );
        const selectedOptions = this.state.rightList.filter(e1 => {
            return !rightSelection.includes(e1);
        });
        this.setState(
            {
                rightSelected: [],
                leftList: this._initList(selectedOptions, this.props.options),
                rightList: this._initList([], selectedOptions),
            },
            () => {
                this.props.onChange(selectedOptions);
            }
        );
    };

    // handler for handling selected fields in FilteredMultiSelectList
    _onFilteredMultiSelectListSelect = (id, selectedValues) => {
        if (id === 'left') {
            this.setState({
                leftSelected: selectedValues,
            });
        } else {
            this.setState({
                rightSelected: selectedValues,
            });
        }
    };

    render() {
        const Item = innerProps => (
            <div className={styles.rtl_item}>
                <div className={`${styles.rtl_item_content} ${styles.rtl_container}`}>
                    {innerProps.children}
                </div>
            </div>
        );

        const { valueProp, textProp, leftListTitle, rightListTitle, defaultFilter } = this.props;
        const { leftList, leftSelected, rightList, rightSelected } = this.state;
        return (
            <div className={`${styles.rtl_wrapper} ${styles.rtl_container}`}>
                <Item>
                    <FilteredMultiSelectList
                        id='left'
                        title={leftListTitle}
                        defaultFilter={defaultFilter}
                        valueProp={valueProp}
                        textProp={textProp}
                        options={leftList}
                        selectedOptions={leftSelected}
                        onSelected={this._onFilteredMultiSelectListSelect}
                        showFilter
                    />
                </Item>
                <Item>
                    <button className={styles.rtl_button} onClick={this._addSelectionToRightList}>
                        &gt;
                    </button>
                    <button className={styles.rtl_button} onClick={this._addSelectionToLeftList}>
                        &lt;
                    </button>
                </Item>
                <Item>
                    <FilteredMultiSelectList
                        id='right'
                        title={rightListTitle}
                        defaultFilter={defaultFilter}
                        valueProp={valueProp}
                        textProp={textProp}
                        options={rightList}
                        selectedOptions={rightSelected}
                        onSelected={this._onFilteredMultiSelectListSelect}
                        showFilter
                    />
                </Item>
            </div>
        );
    }
}

TransferList.defaultProps = {
    options: [],
    selectedOptions: [],
    textProp: 'text',
    valueProp: 'value',
    leftListTitle: 'Items',
    rightListTitle: 'Selected',
    showFilter: true,
    defaultFilter: '',
    filterPlaceHolder: 'type to filter',
    disabled: false,
};

TransferList.propTypes = {
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    selectedOptions: PropTypes.array,
    textProp: PropTypes.string,
    valueProp: PropTypes.string,
    leftListTitle: PropTypes.string,
    rightListTitle: PropTypes.string,
    showFilter: PropTypes.bool,
    defaultFilter: PropTypes.string,
    filterPlaceHolder: PropTypes.string,
    disabled: PropTypes.bool,
};

export default TransferList;
