/* eslint-disable no-unused-vars */

// File name
const fileName = componentName =>
`${componentName.toLowerCase()}.jsx`;

// File content
const content = componentName =>
`/* ----- Imports ------------------------------------------------------------ */
import React, { PropTypes } from 'react';
import cssModules from 'react-css-modules';
/* ----- Styles ------------------------------------------------------------- */
import styles from './${componentName.toLowerCase()}.css';
/* -------------------------------------------------------------------------- */

class ${componentName} extends React.Component {
  static propTypes = {}

  state = {}

  render() {
    const { className, children, ...props } = this.props;
    return (
      <div className={className} {...props}>
        { children }
      </div>
    );
  }
}

/* ----- PropTypes ---------------------------------------------------------- */
${componentName}.propTypes = {
  className: PropTypes.string,
};
/* -------------------------------------------------------------------------- */
export default cssModules(${componentName}, styles);
`;

module.exports = {
  fileName,
  content,
};
