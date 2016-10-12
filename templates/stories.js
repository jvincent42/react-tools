/* eslint-disable no-unused-vars */

// File name
const fileName = componentName =>
'stories.js';

// File content
const content = componentName =>
`/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
// eslint-disable-next-line
import { storiesOf, action, linkTo } from '@kadira/storybook';

import ${componentName} from './${componentName.toLowerCase()}';

storiesOf('${componentName}', module)
  .add('${componentName}', () => (
    <${componentName} />
  ));
`;

module.exports = {
  fileName,
  content,
};
