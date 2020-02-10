import React from 'react';
import PropTypes from 'prop-types';
import Dot from '../atoms/Dot';

const Snake = ({ body }) => (
  <>
    {body.map(segment => (
      <Dot x={segment.x} y={segment.y} />
    ))}
  </>
);

Snake.propTypes = {
  body: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  ).isRequired,
};

export default Snake;
