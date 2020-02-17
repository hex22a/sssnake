import React, { FunctionComponent } from 'react';

import styled from 'styled-components';
import { withProps } from '../styled_component_with_props_decorator';

interface ColoredBoxProps {
  color: string;
  x: number;
  y: number;
}

const ColoredBox = withProps<ColoredBoxProps>()(styled.div)`
  width: 100%;
  height: 100%;
  background-color: ${props => props.color};
  grid-area: ${props => props.y} / ${props => props.x} / ${props => props.y + 1} / ${props => props.x + 1};
`;

interface DotProps {
  color?: string;
  x: number;
  y: number;
}

const Dot: FunctionComponent<DotProps> = ({ x, y, color = 'black' }) => <ColoredBox x={x} y={y} color={color} />;

export default Dot;
