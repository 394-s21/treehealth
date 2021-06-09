import React from "react";
import { Dimensions } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import Charts from '../plots/Charts';
import SapFlow from '../plots/SapFlow';

jest.mock('../plots/SapFlow', () => {
    return {
        ...jest.requireActual('../plots/SapFlow'),
        __esModule: true,
        default: ({timeRange, domain, onScroll}) => (
          <div
            testID={"sapFlow"}
            domain={domain}
            timeRange={timeRange}
            onScroll={onScroll}
          />
        )
      }
});

jest.mock('../plots/Environment', () => {
    return {
        ...jest.requireActual('../plots/Environment'),
        __esModule: true,
        default: ({timeRange, domain}) => (
          <div
            testID={"enviornment"}
            domain={domain}
            timeRange={timeRange}
          />
        )
      }
});

jest.mock('react-native-bouncy-checkbox', () => {
    return {
      __esModule: true,
      default: ({ text, onPress }) => (
        <div
          testID={`${text}-checkbox`}
          onPress={onPress}
        />
      )
    }
  });

jest.mock('../Victory', () => {
    return {
      ...jest.requireActual('../Victory'),
      VictoryChart: ({ children }) => (<div testID='chart'>{children}</div>),
      VictoryLine: ({testID}) => (<div testID={testID} />),
      VictoryScatter: () => (<div />),
      VictoryAxis: ({testID}) => (<div testID={testID} />)
    }
});

it('graphs start at the same daily domain', () => {
    const {getByTestId } = render(
        <Charts
          timeRange={"daily"}
        />
      );
  
      expect(getByTestId("sapFlow")).toBeDefined();
      expect(getByTestId("enviornment")).toBeDefined();
  
      // Update the graph a bit to update domain
      expect(getByTestId("sapFlow").props.domain).toStrictEqual(getByTestId("enviornment").props.domain);
  });

  it('graphs start at the same weekly domain', () => {
    const {getByTestId } = render(
        <Charts
          timeRange={"weekly"}
        />
      );
  
      expect(getByTestId("sapFlow")).toBeDefined();
      expect(getByTestId("enviornment")).toBeDefined();
  
      // Update the graph a bit to update domain
      expect(getByTestId("sapFlow").props.domain).toStrictEqual(getByTestId("enviornment").props.domain);
  });

  it('checking graph domain changes with scroll', () => {
    const initialDomain = [0, 50];
    var domain = initialDomain;

    function setDomain(domainInput) {
        domain = domainInput;
    }
    
    function advanceDomain(domain, inc) {
        return [domain[0] + inc, domain[1] + inc];
    }

    const mockScroll = jest.fn((props) => {
        props.setDomain(advanceDomain(props.domain, 5));
    });

    const { container, getByTestId } = render(
        <SapFlow
      timeRange={"daily"}
      domain={domain}
      setDomain={setDomain}
      onScroll={mockScroll}
    />);

    fireEvent.scroll(getByTestId('sapFlow'), container.props);
      

    // Update the graph a bit to update domain
    expect(domain).not.toEqual(initialDomain);
      
  });