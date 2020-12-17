import 'ag-grid-community/dist/styles/ag-grid.min.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.min.css';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    options: {
        storySort: {
            order: ['Docs', ['Intro', 'TestComponent'], 'Components', ['TestComponent']],
        },
    },
};
