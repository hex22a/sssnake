import React from 'react';
import styled from 'styled-components';
import Food from '../molecules/Food';
import Snake from '../molecules/Snake';
import { FIELD_SIZE } from '../Game';

const Grid = styled.div`
  display: grid;
  grid: repeat(${FIELD_SIZE}, 1fr) / repeat(${FIELD_SIZE}, 1fr);
  width: 100%;
  height: 100%;
`;

const GameBox = () => (
  <Grid>
    <Food x={1} y={7} />
    <Snake
      body={[
        { x: 47, y: 50 },
        { x: 48, y: 50 },
        { x: 49, y: 50 },
        { x: 50, y: 50 },
      ]}
    />
  </Grid>
);

export default GameBox;
