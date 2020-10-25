import * as React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import TestComponent from './TestComponent';

export default {
    title: 'Components/TestComponent',
    component: TestComponent,
} as Meta;

export const Primary = (): JSX.Element => <TestComponent theme="primary" />;

export const Secondary = (): JSX.Element => <TestComponent theme="secondary" />;
