import { configure, addParameters } from '@storybook/react';

const req = require.context('../stories', true, /.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

addParameters({
  options: {
    name: 'Gift Storybook',
    isFullScreen: false,
    showPanel: false,
  },
});

configure(loadStories, module);
