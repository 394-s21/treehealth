import React from 'react';
import { render } from '@testing-library/react-native';
import SapFlow from '../plots/SapFlow';

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

it('renders sap flow chart', () => {
  // TODO: Darryl
  const { getByTestId } = render(
    <SapFlow
      timeRange='daily'
      domain={[]}
      setDomain={() => null}
    />
  );

  expect(getByTestId('chart'));
});

it('sap flow checkboxes trigger lines', () => {
  // TODO - Darryl
  expect(true).toBe(true);
});
