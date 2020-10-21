import React from "react";
import styles from './TestComponent.scss';

interface TestComponentProps {
    theme: "primary" | "secondary";
}

/***************************************************
 * Main Code
 ***************************************************/

const TestComponent = (props: TestComponentProps) => {
    return (
        <div data-testid="test-component" className={`test-component test-component-${props.theme} ${styles.testComponent}`}>
            <h1 className="heading">I'm the test component</h1>
            <h2>Made with love by Harvey</h2>
        </div>
    );
};

export default TestComponent;