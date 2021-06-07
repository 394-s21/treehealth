import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Environment from '../plots/Environment';


jest.mock('react-native-bouncy-checkbox', () => {
  return {
    __esModule: true,
    default: ({testID, onPress}) => (<div
      testID={testID}
      onPress={onPress}
    />)
  }
});

jest.mock('../Victory', () => {
  return {
    ...jest.requireActual('../Victory'),
    VictoryChart: ({ children }) => (<div testID='chart'>{children}</div>),
    VictoryLine: ({testID}) => (<div testID={testID} />),
    VictoryScatter: () => (<div />),
    VictoryAxis: ({testID}) => (<div testID={testID} />),
    
  }
});

it('checkboxes render on environment chart', () => {
  const { getByTestId } = render(
    <Environment
      timeRange='daily'
      domain={[]}
      setDomain={() => null}
    />
  );

  expect(getByTestId("vpdCheckbox")).toBeDefined();
  expect(getByTestId("tempCheckbox")).toBeDefined();
  expect(getByTestId("rainCheckbox")).toBeDefined();

});

it('clicking checkboxes renders line', () => {


  const { getByTestId, queryByTestId } = render(
    <Environment
      timeRange='daily'
      domain={[]}
      setDomain={() => null}
    />
  );
  
  expect(queryByTestId('vpdLine')).toBeNull();
  fireEvent.press(getByTestId('vpdCheckbox'));
  expect(getByTestId('vpdLine')).toBeDefined();
  
  expect(queryByTestId('tempLine')).toBeNull();
  fireEvent.press(getByTestId('tempCheckbox'));
  expect(getByTestId('tempLine')).toBeDefined();

  expect(queryByTestId('rainLine')).toBeNull();
  fireEvent.press(getByTestId('rainCheckbox'));
  expect(getByTestId('rainLine')).toBeDefined();

});

it('clicking checkboxes renders vertical axes', () => {
  const { getByTestId, queryByTestId } = render(
    <Environment
      timeRange='daily'
      domain={[]}
      setDomain={() => null}
    />
  );
  
  expect(queryByTestId('vpdAxis')).toBeNull();
  fireEvent.press(getByTestId('vpdCheckbox'));
  expect(getByTestId('vpdAxis')).toBeDefined();
  
  expect(queryByTestId('tempAxis')).toBeNull();
  fireEvent.press(getByTestId('tempCheckbox'));
  expect(getByTestId('tempAxis')).toBeDefined();

  expect(queryByTestId('rainAxis')).toBeNull();
  fireEvent.press(getByTestId('rainCheckbox'));
  expect(getByTestId('rainAxis')).toBeDefined();
})
