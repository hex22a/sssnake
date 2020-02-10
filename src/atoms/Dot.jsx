import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ColoredBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.color};
  grid-area: ${props => props.y} / ${props => props.x} / ${props => props.y + 1} / ${props => props.x + 1};
`;

const Dot = ({ x, y, color }) => <ColoredBox x={x} y={y} color={color} />;

Dot.propTypes = {
  color: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

Dot.defaultProps = {
  color: 'black',
};

export default Dot;
