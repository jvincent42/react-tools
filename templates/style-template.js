/* eslint-disable no-unused-vars */

// File name
const fileName = componentName =>
`${componentName.toLowerCase()}.css`;

// File content
const content = componentName =>
':root {}\n';

module.exports = {
  fileName,
  content,
};
