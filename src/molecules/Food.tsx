import React, { FunctionComponent } from 'react';
import Dot from '../atoms/Dot';

export interface FoodProps {
  x: number;
  y: number;
}

const Food: FunctionComponent<FoodProps> = ({ x, y }) => <Dot x={x} y={y} color="green" />;

export default Food;
