import React from 'react';
import { render } from '@testing-library/react-native';
import Environment from '../plots/Environment';

jest.mock('react-native-bouncy-checkbox', () => {
  return {
    __esModule: true,
    default: () => (<div />)
  }
});

jest.mock('../Victory', () => {
  return {
    ...jest.requireActual('../Victory'),
    VictoryChart: ({ children }) => (<div testID='chart'>{children}</div>),
    VictoryScatter: () => (<div />),
    VictoryAxis: () => (<div testID='axis' />)
  }
});

it('renders environment chart', () => {
  const { getByTestId, getAllByTestId } = render(
    <Environment
      timeRange='daily'
      domain={[]}
      setDomain={() => null}
    />
  );

  expect(getByTestId('chart')).toBeDefined();
  expect(getAllByTestId('axis')).toHaveLength(1);
});
