import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SapFlow from '../plots/SapFlow';
import Environment from '../plots/Environment';

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
        VictoryScatter: ({ data }) => (<div testID='scatter' data={data} />),
        VictoryAxis: () => (<div testID='axis' />)
    }
});

it('scatter plot renders', () => {
    const { getByTestId } = render(
        <SapFlow
            timeRange='daily'
            domain={[]}
            setDomain={() => null}
        />
    );
    
    expect(getByTestId('scatter')).toBeDefined();
})

it('sap flow checkboxes change scatter plots', () => {
    const { getByTestId } = render(
        <SapFlow
            timeRange='daily'
            domain={[]}
            setDomain={() => null}
        />
    );

    fireEvent.press(getByTestId('Sap Flow Out-checkbox'));

    expect(getByTestId('scatter')).toBeDefined();
    
    fireEvent.press(getByTestId('Sap Flow In-checkbox'));
    fireEvent.press(getByTestId('Sap Flow Out-checkbox'));
    
    expect(getByTestId('scatter').props.data).toEqual([])

});

it('environment checkboxes change scatter plots', () => {

    const { getByTestId } = render(
      <Environment
        timeRange='daily'
        domain={[]}
        setDomain={() => null}
      />
    );

    expect(getByTestId('scatter').props.data).toEqual([]);
    
    fireEvent.press(getByTestId('vpdCheckbox'));
    
    expect(getByTestId('scatter')).toBeDefined();
    
    fireEvent.press(getByTestId('vpdCheckbox'));
    
    expect(getByTestId('scatter').props.data).toEqual([]);

    fireEvent.press(getByTestId('tempCheckbox'));
    
    expect(getByTestId('scatter')).toBeDefined();
    
    fireEvent.press(getByTestId('tempCheckbox'));
    
    expect(getByTestId('scatter').props.data).toEqual([]);
  
    fireEvent.press(getByTestId('rainCheckbox'));
    
    expect(getByTestId('scatter')).toBeDefined();
    
    fireEvent.press(getByTestId('rainCheckbox'));
    
    expect(getByTestId('scatter').props.data).toEqual([]);
  });