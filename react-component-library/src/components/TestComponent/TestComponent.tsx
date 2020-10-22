import React from 'react';
import styles from './TestComponent.module.scss';
import { TestComponentProps } from './TestComponent.types';

/***************************************************
 * Main Code
 ***************************************************/

const TestComponent = (props: TestComponentProps) => {
    const theme = props.theme === 'primary' ? '' : styles.testComponentSecondary;

    return (
        <div data-testid="test-component" className={`${styles.testComponent} ${theme}`}>
            <h1 className={`${styles.heading}`}>I'm the test component</h1>
            <h2>Made with love by Harvey</h2>
        </div>
    );
};

export default TestComponent;
