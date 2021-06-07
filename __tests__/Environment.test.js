import React from 'react';
import { render } from '@testing-library/react-native';
import Environment from '../plots/Environment';

jest.mock('react-native-bouncy-checkbox', () => {
  return {
    __esModule: true,
    default: () => (<div></div>)
  }
});

jest.mock('../Victory', () => {
  return {
    ...jest.requireActual('../Victory'),
    VictoryChart: () => (<div testID='chart'></div>)
  }
});

it('renders environment chart', () => {
  // TODO: Darryl
  const { getByTestId } = render(
    <Environment
      timeRange='daily'
      domain={[]}
      setDomain={() => null}
    />
  );

  expect(getByTestId('chart'));
});
