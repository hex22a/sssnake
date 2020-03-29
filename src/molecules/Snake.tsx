import React, { FunctionComponent } from 'react';
import Dot from '../atoms/Dot';

export interface Coordinates {
  x: number;
  y: number;
}

export interface SnakeProps {
  body: Array<Coordinates>;
}

const Snake: FunctionComponent<SnakeProps> = ({ body }) => (
  <>
    {body.map((segment) => (
      <Dot key={`${segment.x}_${segment.y}`} x={segment.x} y={segment.y} />
    ))}
  </>
);

export default Snake;
