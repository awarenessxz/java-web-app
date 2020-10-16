import { configureActions } from "@storybook/addon-actions";

// configure addon-actions
configureActions({
  depth: 100,
  // Limit the number of  items logged into the actions panel
  limit: 20,
  clearOnStoryChange: true
});