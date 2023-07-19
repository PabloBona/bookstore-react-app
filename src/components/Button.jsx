import React from 'react';
import PropTypes from 'prop-types';

function Button({ onClick, children }) {
  return (
    <button className="btn btn-reset" type="button" onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
