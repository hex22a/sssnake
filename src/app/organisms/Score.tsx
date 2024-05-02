import React, { FunctionComponent } from 'react';

interface ScoreProps {
  points: number;
}

const Score: FunctionComponent<ScoreProps> = ({ points }) => <>{points}</>;

export default Score;
