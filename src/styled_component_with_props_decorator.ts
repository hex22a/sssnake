// eslint-disable-next-line import/named
import { ThemedStyledFunction } from 'styled-components';

export const withProps = <U>() => <P, T, O>(fn: ThemedStyledFunction<P, T, O>): ThemedStyledFunction<P & U, T, O & U> =>
  fn;

export default withProps;
