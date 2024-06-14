import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Food, { FoodProps } from '../molecules/Food';
import Snake, { Coordinates } from '../molecules/Snake';
import { FIELD_SIZE } from '../Game';

const Grid = styled.div`
  display: grid;
  grid: repeat(${FIELD_SIZE}, 1fr) / repeat(${FIELD_SIZE}, 1fr);
  width: 100%;
  height: 100%;
  border: 1px solid;
`;

interface GameBoxProps {
  snake: Array<Coordinates>;
  food: FoodProps;
}

const GameBox: FunctionComponent<GameBoxProps> = ({ snake, food }) => (
  <Grid>
    <Food x={food.x} y={food.y} />
    <Snake body={snake} />
  </Grid>
);

export default GameBox;
