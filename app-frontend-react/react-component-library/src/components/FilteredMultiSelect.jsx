import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/transferListStyles.module.css';

class FilteredMultiSelectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: props.defaultFilter,
            filteredOptions: this._filterOptions(props.defaultFilter, props.options),
            selectedValues: props.selectedOptions,
        };
    }

    _filterOptions(filter, options) {
        if (typeof filter === 'undefined') {
            filter = this.state.filter;
        }
        if (typeof options === 'undefined') {
            options = this.props.options;
        }
        filter = filter.toUpperCase();

        const { textProp } = this.props;
        const filteredOptions = [];

        for (let i = 0, l = options.length; i < l; i++) {
            if (!filter || options[i][textProp].toUpperCase().indexOf(filter) !== -1) {
                filteredOptions.push(options[i]);
            }
        }

        return filteredOptions;
    }

    _selectRef = select => {
        this._select = select;
    };

    _checkboxRef = checkbox => {
        this._checkbox = checkbox;
    };

    _onFilterChange = e => {
        const filter = e.target.value;
        this.setState(
            {
                filter,
                filteredOptions: this._filterOptions(filter),
            },
            this._updateSelectedValues
        );
    };

    _onCheckedAll = e => {
        const { checked } = e.target;
        for (let i = 0, l = this._select.options.length; i < l; i++) {
            this._select.options[i].selected = checked;
        }
        this._updateSelectedValues();
    };

    _updateSelectedValues = e => {
        const el = e ? e.target : this._select;
        const selectedValues = [];
        for (let i = 0, l = el.options.length; i < l; i++) {
            if (el.options[i].selected) {
                selectedValues.push(el.options[i].value);
            }
        }
        this._checkbox.checked = selectedValues.length === el.options.length;

        // Always update if we were handling an event, otherwise only update if
        // selectedValues has actually changed.
        if (e || String(this.state.selectedValues) !== String(selectedValues)) {
            this.setState({ selectedValues }, () => {
                this.props.onSelected(this.props.id, selectedValues);
            });
        }
    };

    render() {
        const { disabled, title, textProp, valueProp, showFilter, filterPlaceHolder } = this.props;
        const { selectedValues, filter, filteredOptions } = this.state;
        return (
            <div className={styles.rtl_card}>
                <div className={styles.rtl_card_header}>
                    <div className={styles.rtl_checkbox}>
                        <input
                            ref={this._checkboxRef}
                            type='checkbox'
                            onChange={this._onCheckedAll}
                            disabled={disabled}
                        />
                    </div>
                    <div className={styles.rtl_header_content}>
                        <span>{title}</span>
                        <span className={styles.rtx_text_secondary}>
                            {selectedValues.length}/{filteredOptions.length} selected
                        </span>
                    </div>
                </div>
                <hr className={styles.rtl_divider} />
                <div className={styles.rtl_card_list_wrapper}>
                    {showFilter && (
                        <input
                            type='text'
                            placeholder={filterPlaceHolder}
                            className={styles.form_control}
                            onChange={this._onFilterChange}
                            value={filter}
                            disabled={disabled}
                        />
                    )}
                    <select
                        multiple
                        ref={this._selectRef}
                        className={styles.form_control}
                        onChange={this._updateSelectedValues}
                        size={filteredOptions.length}
                        value={selectedValues}
                        disabled={disabled}>
                        {filteredOptions.map(option => {
                            return (
                                <option key={option[valueProp]} value={option[valueProp]}>
                                    {option[textProp]}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
        );
    }
}

FilteredMultiSelectList.defaultProps = {
    selectedOptions: [],
    textProp: 'text',
    valueProp: 'value',
    title: 'Select List',
    defaultFilter: '',
    filterPlaceHolder: 'type to filter',
    showFilter: false,
    disabled: false,
};

FilteredMultiSelectList.propTypes = {
    id: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onSelected: PropTypes.func.isRequired,
    selectedOptions: PropTypes.array,
    textProp: PropTypes.string,
    valueProp: PropTypes.string,
    title: PropTypes.string,
    defaultFilter: PropTypes.string,
    filterPlaceHolder: PropTypes.string,
    showFilter: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default FilteredMultiSelectList;
