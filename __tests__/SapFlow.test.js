import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SapFlow from '../plots/SapFlow';

jest.mock('react-native-bouncy-checkbox', () => {
  return {
    __esModule: true,
    default: ({ testID, onPress }) => (
      <div
        testID={testID}
        onPress={onPress}
      />
    )
  }
});

jest.mock('../Victory', () => {
  return {
    ...jest.requireActual('../Victory'),
    VictoryChart: ({ children }) => (<div testID='chart'>{children}</div>),
    VictoryLine: ({ testID }) => (<div testID={testID} />),
    VictoryScatter: () => (<div />),
    VictoryAxis: () => (<div testID='axis' />)
  }
});

it('renders sap flow chart', () => {
  const { getByTestId, getAllByTestId } = render(
    <SapFlow
      timeRange='daily'
      domain={[]}
      setDomain={() => null}
    />
  );

  expect(getByTestId('chart')).toBeDefined();
  expect(getAllByTestId('axis')).toHaveLength(2);
});

it('sap flow checkboxes trigger lines', () => {
  const { getByTestId, queryByTestId } = render(
    <SapFlow
      timeRange='daily'
      domain={[]}
      setDomain={() => null}
    />
  );

  expect(getByTestId('Sap Flow In-checkbox')).toBeDefined();
  expect(getByTestId('Sap Flow Out-checkbox')).toBeDefined();

  expect(getByTestId('lineIn')).toBeDefined();
  expect(queryByTestId('lineOut')).toBeNull();

  fireEvent.press(getByTestId('Sap Flow Out-checkbox'));

  expect(getByTestId('lineIn')).toBeDefined();
  expect(getByTestId('lineOut')).toBeDefined();

  fireEvent.press(getByTestId('Sap Flow In-checkbox'));

  expect(queryByTestId('lineIn')).toBeNull();
  expect(getByTestId('lineOut')).toBeDefined();

  fireEvent.press(getByTestId('Sap Flow Out-checkbox'));

  expect(queryByTestId('lineIn')).toBeNull();
  expect(queryByTestId('lineOut')).toBeNull();
});