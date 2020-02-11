import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GameBox from '../organisms/GameBox';
import Score from '../organisms/Score';

const Grid = styled.div`
  display: grid;
  grid:
    [header-start] 'left-sidebar header right-sidebar' 25px [header-end]
    [main-start] 'left-sidebar game right-sidebar' 600px [main-end]
    [footer-start] 'left-sidebar counter right-sidebar' 50px [footer-end]
    / 1fr 600px 1fr;
  place-items: center;
`;

const GameArea = styled.div`
  grid-area: game;
  place-self: stretch;
`;

const CounterBox = styled.div`
  grid-area: counter;
`;

const GameField = ({ snake, food }) => (
  <Grid>
    <GameArea>
      <GameBox snake={snake} food={food} />
    </GameArea>
    <CounterBox>
      <Score />
    </CounterBox>
  </Grid>
);

GameField.propTypes = {
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

export default GameField;
