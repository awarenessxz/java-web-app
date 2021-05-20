import * as React from 'react';
import { render, RenderResult, fireEvent, screen } from '@testing-library/react';

// Import Component
import GetApp from '@material-ui/icons/GetApp';
import ToolButton from './ToolButton';
import { ToolButtonProps, ToolButtonTypes } from './ToolButton.types';

// function to render component before each test
type PartialToolButtonProps = Partial<ToolButtonProps>;
const renderComponent = ({ ...props }: PartialToolButtonProps = {}): RenderResult => {
    const defaultProps: ToolButtonProps = {
        tooltipMsg: 'Tooltip Message',
        icon: <GetApp />, // for mocking only (just a random icon in material-ui)
        onClick: jest.fn(),
        buttonType: ToolButtonTypes.normal,
    };
    const merged = { ...defaultProps, ...props };
    return render(<ToolButton {...merged} />); // returns methods (refer to api)
};

// 1. Testing if component renders properly
describe('Testing if component renders properly', () => {
    // Snapshot Testing
    it('Snapshot Testing', () => {
        const { asFragment } = renderComponent();
        expect(asFragment()).toMatchSnapshot();
    });

    // Testing Dom Elements: check if renders with correct value (Note the usage of data-testid in component)
    describe('component renders with correct state (Testing Dom Elements)', () => {
        it('buttonType="normal" renders properly', () => {
            const toolTip = 'normal button';
            renderComponent({ buttonType: ToolButtonTypes.normal, tooltipMsg: toolTip });
            expect(screen.getByRole('button', { name: toolTip })).toBeTruthy();
        });

        it('buttonType="badge" renders properly', () => {
            const toolTip = 'badge button';
            const badgeCount = 5;
            renderComponent({
                buttonType: ToolButtonTypes.badge,
                tooltipMsg: toolTip,
                buttonTypeProps: { badgeCount },
            });
            expect(screen.getByRole('button', { name: toolTip })).toBeTruthy();
            expect(screen.getByText(badgeCount.toString())).toBeTruthy();
        });

        it('buttonType="menu" renders properly', () => {
            const toolTip = 'menu button';
            const menuItems = ['menu 1', 'menu 2'];
            renderComponent({ buttonType: ToolButtonTypes.menu, tooltipMsg: toolTip, buttonTypeProps: { menuItems } });
            expect(screen.getByRole('button', { name: toolTip })).toBeTruthy();
        });

        it('buttonType="dropdown" renders properly', () => {
            const toolTip = 'dropdown button';
            const clickFn = jest.fn();
            const MockComponent = (): JSX.Element => <div>Hello World</div>;
            renderComponent({
                buttonType: ToolButtonTypes.dropdown,
                tooltipMsg: toolTip,
                buttonTypeProps: {
                    dropdownContent: <MockComponent />,
                },
                onClick: clickFn,
            });
            expect(screen.getByRole('button', { name: toolTip })).toBeTruthy();
            // opens dropdown
            fireEvent.click(screen.getByRole('button', { name: toolTip }));
            expect(screen.queryByText('Hello World')).toBeInTheDocument();
        });

        it('disabled button renders properly', () => {
            const toolTip = 'disabled button';
            renderComponent({ disabled: true, tooltipMsg: toolTip });
            expect(screen.getByRole('button', { name: toolTip })).toBeDisabled();
        });
    });
});

// 2. Testing Events (Eg. onClick)
describe('Testing Events', () => {
    describe('onClick is called', () => {
        it('when ToolButton[type="normal"] is clicked', () => {
            const toolTip = 'normal button';
            const clickFn = jest.fn();
            renderComponent({
                buttonType: ToolButtonTypes.normal,
                tooltipMsg: toolTip,
                onClick: clickFn,
            });
            fireEvent.click(screen.getByRole('button', { name: toolTip }));
            expect(clickFn).toHaveBeenCalled();
        });

        it('when ToolButton[type="badge"] is clicked', () => {
            const toolTip = 'badge button';
            const clickFn = jest.fn();
            renderComponent({
                buttonType: ToolButtonTypes.badge,
                buttonTypeProps: {
                    badgeCount: 5,
                },
                tooltipMsg: toolTip,
                onClick: clickFn,
            });
            fireEvent.click(screen.getByRole('button', { name: toolTip }));
            expect(clickFn).toHaveBeenCalled();
        });

        it('when menu item in ToolButton[type="menu"] is clicked', () => {
            const toolTip = 'menu button';
            const menuItems = ['menu 1', 'menu 2'];
            const clickFn = jest.fn();
            renderComponent({
                buttonType: ToolButtonTypes.menu,
                buttonTypeProps: { menuItems },
                tooltipMsg: toolTip,
                onClick: clickFn,
            });
            // opens menu
            fireEvent.click(screen.getByRole('button', { name: toolTip }));
            // click on menu item
            fireEvent.click(screen.getByRole('menuitem', { name: menuItems[0] }));
            expect(clickFn).toHaveBeenCalled();
        });

        it('when onClick is called in ToolButton[type="dropdown"] is clicked', () => {
            const toolTip = 'dropdown button';
            const clickFn = jest.fn();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
            const MockComponent = (props: any): JSX.Element => <button onClick={props.onClick}>Hello World</button>;
            renderComponent({
                buttonType: ToolButtonTypes.dropdown,
                buttonTypeProps: {
                    dropdownContent: <MockComponent />,
                },
                tooltipMsg: toolTip,
                onClick: clickFn,
            });
            // opens dropdown
            fireEvent.click(screen.getByRole('button', { name: toolTip }));
            // trigger click
            fireEvent.click(screen.getByRole('button', { name: 'Hello World' }));
            expect(clickFn).toHaveBeenCalled();
        });
    });
});
