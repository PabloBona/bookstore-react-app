/* eslint-disable react/prop-types */
import React from 'react';

function ButtonDelete({ onClick }) {
  return (
    <button type="submit" onClick={onClick}>Eliminar</button>
  );
}

export default ButtonDelete;
