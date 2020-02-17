import { ThemedStyledFunction } from 'styled-components';

// @ts-ignore
export const withProps = <U>() => <P, T, O>(fn: ThemedStyledFunction<P, T, O>): ThemedStyledFunction<P & U, T, O & U> =>
  // @ts-ignore
  fn;

export default withProps;
