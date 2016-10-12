/* eslint-disable no-unused-vars */

// File name
const fileName = componentName =>
'index.js';

// File content
const content = componentName =>
`const ${componentName} = require('./${componentName}.jsx');
export default ${componentName};
`;

module.exports = {
  fileName,
  content,
};
