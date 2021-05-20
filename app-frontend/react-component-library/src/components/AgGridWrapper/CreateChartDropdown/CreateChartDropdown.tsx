import React, { useState } from 'react';
// Import External Libraries
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { ChartType, CreateRangeChartParams, LegendPosition } from 'ag-grid-community';
// Import Internal Libraries
import { CreateChartDropdownProps } from './CreateChartDropdown.types';
import styles from './CreateChartDropdown.module.scss';

const CreateChartDropdown = ({
    defaultColumnNames = [],
    defaultColumnFields = [],
    onClick,
}: CreateChartDropdownProps): JSX.Element => {
    const chartTypes = [
        ChartType.GroupedColumn,
        ChartType.StackedColumn,
        ChartType.NormalizedColumn,
        ChartType.GroupedBar,
        ChartType.StackedBar,
        ChartType.NormalizedBar,
        ChartType.Line,
        ChartType.Scatter,
        ChartType.Bubble,
        ChartType.Pie,
        ChartType.Doughnut,
        ChartType.Area,
        ChartType.StackedArea,
        ChartType.NormalizedArea,
    ];
    const chartThemes = [
        'ag-default',
        'ag-default-dark',
        'ag-material',
        'ag-material-dark',
        'ag-pastel',
        'ag-pastel-dark',
        'ag-vivid',
        'ag-vivid-dark',
        'ag-solar',
        'ag-solar-dark',
    ];
    const legendPlacements = [LegendPosition.Top, LegendPosition.Right, LegendPosition.Bottom, LegendPosition.Left];
    const [title, setTitle] = useState('');
    const [startRowIndex, setStartRowIndex] = useState(1);
    const [endRowIndex, setEndRowIndex] = useState(3);
    const [columnNames, setColumnNames] = useState(defaultColumnNames);
    const [isAllCellRange, setIsAllCellRange] = useState(true);
    const [showLegend, setShowLegend] = useState(true);
    const [legendPlacement, setLegendPlacement] = useState<LegendPosition>(LegendPosition.Right);
    const [chartType, setChartType] = useState<ChartType>(ChartType.GroupedColumn);
    const [chartThemeName, setChartThemeName] = useState(chartThemes[6]);

    const getColumnFieldsMapping = (): string[] => {
        return columnNames.map((value) => {
            const index = defaultColumnNames.indexOf(value);
            return defaultColumnFields[index];
        });
    };

    const getParams = (): CreateRangeChartParams => {
        return {
            cellRange: {
                columns: getColumnFieldsMapping(),
                rowStartIndex: isAllCellRange ? undefined : startRowIndex - 1,
                rowEndIndex: isAllCellRange ? undefined : endRowIndex - 1,
            },
            chartType,
            chartThemeName,
            chartThemeOverrides: {
                common: {
                    title: {
                        enabled: true,
                        text: title,
                    },
                    legend: {
                        enabled: showLegend,
                        position: legendPlacement,
                    },
                },
            },
            unlinkChart: true,
        };
    };

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <h4 style={{ margin: '5px 0' }}>Create Charts</h4>
                    <Divider />
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={5}>
                    Chart Title
                </Grid>
                <Grid item xs={7}>
                    <TextField id="chartTitle" label="can be empty" onChange={(e): void => setTitle(e.target.value)} />
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={5}>
                    Columns
                </Grid>
                <Grid item xs={7}>
                    <FormControl className={styles.inputControlLength}>
                        <Select
                            multiple
                            value={columnNames}
                            onChange={(e: React.ChangeEvent<{ value: unknown }>): void =>
                                setColumnNames(e.target.value as string[])
                            }
                            input={<Input />}
                            renderValue={(selected): React.ReactNode => (selected as string[]).join(', ')}
                        >
                            {defaultColumnNames.map((name: string, index: number) => {
                                return (
                                    <MenuItem key={index} value={name}>
                                        <Checkbox checked={columnNames.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={5}>
                    Cell Range
                </Grid>
                <Grid item xs={7}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isAllCellRange}
                                onChange={(): void => setIsAllCellRange(!isAllCellRange)}
                                name="chartCellRange"
                            />
                        }
                        label={isAllCellRange ? 'All Rows' : 'Customized'}
                    />
                </Grid>
            </Grid>
            {!isAllCellRange && (
                <React.Fragment>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={1} />
                        <Grid item xs={6}>
                            Start Row No.
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                id="chartStartRow"
                                value={startRowIndex}
                                onChange={(e): void => setStartRowIndex(parseInt(e.target.value, 10))}
                                type="number"
                                style={{ maxWidth: '80px' }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={1} />
                        <Grid item xs={6}>
                            End Row No.
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                id="chartEndRow"
                                value={endRowIndex}
                                onChange={(e): void => setEndRowIndex(parseInt(e.target.value, 10))}
                                type="number"
                                style={{ width: '80px' }}
                            />
                        </Grid>
                    </Grid>
                </React.Fragment>
            )}
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={5}>
                    Chart Type
                </Grid>
                <Grid item xs={7}>
                    <FormControl className={styles.inputControlLength}>
                        <Select value={chartType} onChange={(e): void => setChartType(e.target.value as ChartType)}>
                            {chartTypes.map((name, index) => {
                                return (
                                    <MenuItem key={index} value={name}>
                                        {name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={5}>
                    Chart Palette
                </Grid>
                <Grid item xs={7}>
                    <FormControl className={styles.inputControlLength}>
                        <Select
                            value={chartThemeName}
                            onChange={(e): void => setChartThemeName(e.target.value as string)}
                        >
                            {chartThemes.map((name, index) => {
                                return (
                                    <MenuItem key={index} value={name}>
                                        {name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={5}>
                    Chart Legend
                </Grid>
                <Grid item xs={7}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={showLegend}
                                onChange={(): void => setShowLegend(!showLegend)}
                                name="chartLegend"
                            />
                        }
                        label={showLegend ? 'Show' : 'Hide'}
                    />
                </Grid>
            </Grid>
            {showLegend && (
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={1} />
                    <Grid item xs={6}>
                        Placement
                    </Grid>
                    <Grid item xs={5}>
                        <FormControl style={{ width: '80px' }}>
                            <Select
                                value={legendPlacement}
                                onChange={(e): void => setLegendPlacement(e.target.value as LegendPosition)}
                            >
                                {legendPlacements.map((name, index) => {
                                    return (
                                        <MenuItem key={index} value={name}>
                                            {name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            )}
            <Grid container spacing={1} justify="flex-end" style={{ marginTop: '20px' }}>
                <Button variant="contained" color="primary" onClick={(): void => onClick(getParams())}>
                    Create
                </Button>
            </Grid>
        </div>
    );
};

export default CreateChartDropdown;
