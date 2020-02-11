import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Food from '../molecules/Food';
import Snake from '../molecules/Snake';
import { FIELD_SIZE } from '../Game';

const Grid = styled.div`
  display: grid;
  grid: repeat(${FIELD_SIZE}, 1fr) / repeat(${FIELD_SIZE}, 1fr);
  width: 100%;
  height: 100%;
  border: 1px solid;
`;

const GameBox = ({ snake, food }) => (
  <Grid>
    <Food x={food.x} y={food.y} />
    <Snake body={snake} />
  </Grid>
);

GameBox.propTypes = {
  snake: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  ).isRequired,
  food: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
};

export default GameBox;
