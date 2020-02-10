import React from 'react';
import PropTypes from 'prop-types';
import Dot from '../atoms/Dot';

const Food = ({ x, y }) => <Dot x={x} y={y} color="green" />;

Food.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Food;
