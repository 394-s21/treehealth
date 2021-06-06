import 'react-native';
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import SapFlow from '../plots/SapFlow'

test('Testing test', () => {
  expect(true).toBe(true);
});

// describe('sapflowScatterPlot', () => {
//   const expected = [];
//   it('not empty initial sapflow scatter plot', () => {
//     expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(expected));
//   });
// });

test('Sapflow checkboxes control sap flow line graphs', () => {
  const { getByText, getByAccessibilityLabel } = render(
    <SapFlow />
  );

  fireEvent.press(getByText('Sap Flow In'));

  const sfiLine = getByAccessibilityLabel('sfiLine');
  const sfoLine = getByAccessibilityLabel('sfoLine');
  expect(sfiLine).toBeNull();
  expect(sfoLine).toBeNull();
});