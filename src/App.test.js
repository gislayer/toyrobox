import React from 'react';
import {getAllByAltText, render} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';  

import App from './App';
import { GeneralProvider } from './context';

test('All Components Rendered!',()=>{
  const  { container,getAllByTestId, getByPlaceholderText,getByRole} = render(<GeneralProvider><App/></GeneralProvider>);
  expect(getByPlaceholderText('Write Game Command Text')).toBeInTheDocument();
  getByRole('button', {name: 'Run'});
  getByRole('button', {name: 'MOVE'});
  getByRole('button', {name: 'REPORT'});
  getByRole('button', {name: 'LEFT'});
  getByRole('button', {name: 'RIGHT'});
  expect(getAllByTestId('gamebox').length).toBe(25);
  expect(getAllByTestId('history').length).toBe(1);
});

test('PLACE_ROBOT Command works!',()=>{
  const  { container,getAllByTestId, getByPlaceholderText,getByRole} = render(<GeneralProvider><App/></GeneralProvider>);
  const input = getByPlaceholderText('Write Game Command Text');
  userEvent.type(input,'PLACE_ROBOT 3,3,NORTH');
  const button = getByRole('button', {name: 'Run'});
  userEvent.click(button);
  expect(getAllByTestId('robot').length).toBe(1);
});

test('PLACE_WALL Command works!',()=>{
  const  { container,getAllByTestId, getByPlaceholderText,getByRole} = render(<GeneralProvider><App/></GeneralProvider>);
  const input = getByPlaceholderText('Write Game Command Text');
  userEvent.type(input,'PLACE_WALL 3,3');
  const button = getByRole('button', {name: 'Run'});
  userEvent.click(button);
  userEvent.type(input,'PLACE_WALL 3,2');
  userEvent.click(button);
  expect(getAllByTestId('wall').length).toBe(2);
});

test('MOVE Command works!',()=>{
  const  { getAllByTestId, getByPlaceholderText,getByRole} = render(<GeneralProvider><App/></GeneralProvider>);
  const input = getByPlaceholderText('Write Game Command Text');
  userEvent.type(input,'PLACE_ROBOT 3,3,NORTH');
  const button = getByRole('button', {name: 'Run'});
  userEvent.click(button);
  userEvent.type(input,'MOVE');
  userEvent.click(button);
  expect(getAllByTestId('robot')[0].parentElement.dataset.boxname).toEqual('Row-4,Col-3')
});

test('LEFT Command works!',()=>{
  const  { container,getAllByTestId, getByPlaceholderText,getByRole,debug} = render(<GeneralProvider><App/></GeneralProvider>);
  const input = getByPlaceholderText('Write Game Command Text');
  userEvent.type(input,'PLACE_ROBOT 3,3,NORTH');
  const button = getByRole('button', {name: 'Run'});
  userEvent.click(button);
  userEvent.type(input,'LEFT');
  userEvent.click(button);
  expect(getAllByTestId('robot').length).toBe(1);
  expect(getAllByTestId('robot')[0]).toHaveAttribute('src','./images/assets/WEST.png');
});

test('RIGHT Command works!',()=>{
  const  { container,getAllByTestId, getByPlaceholderText,getByRole,debug} = render(<GeneralProvider><App/></GeneralProvider>);
  const input = getByPlaceholderText('Write Game Command Text');
  userEvent.type(input,'PLACE_ROBOT 3,3,NORTH');
  const button = getByRole('button', {name: 'Run'});
  userEvent.click(button);
  userEvent.type(input,'RIGHT');
  userEvent.click(button);
  expect(getAllByTestId('robot').length).toBe(1);
  expect(getAllByTestId('robot')[0]).toHaveAttribute('src','./images/assets/EAST.png');
});

test('TEST1 works! Result : 5,1,EAST',()=>{
  const  { getAllByTestId, getByPlaceholderText,getByRole} = render(<GeneralProvider><App/></GeneralProvider>);
  const input = getByPlaceholderText('Write Game Command Text');
  const button = getByRole('button', {name: 'Run'});
  userEvent.type(input,'PLACE_ROBOT 3,3,NORTH');
  userEvent.click(button);
  userEvent.type(input,'PLACE_WALL 3,5');
  userEvent.click(button);
  userEvent.type(input,'MOVE');
  userEvent.click(button);
  userEvent.type(input,'MOVE');
  userEvent.click(button);
  userEvent.type(input,'RIGHT');
  userEvent.click(button);
  userEvent.type(input,'MOVE');
  userEvent.click(button);
  userEvent.type(input,'MOVE');
  userEvent.click(button);
  userEvent.type(input,'MOVE');
  userEvent.click(button);
  userEvent.type(input,'REPORT');
  userEvent.click(button);
  expect(getAllByTestId('robot')[0]).toHaveAttribute('src','./images/assets/EAST.png');
  expect(getAllByTestId('robot')[0].parentElement.dataset.boxname).toEqual('Row-5,Col-1')
});

test('TEST2 works! Result : 2,3,EAST',()=>{
  const  { getAllByTestId, getByPlaceholderText,getByRole,debug} = render(<GeneralProvider><App/></GeneralProvider>);
  const input = getByPlaceholderText('Write Game Command Text');
  const button = getByRole('button', {name: 'Run'});
  userEvent.type(input,'PLACE_ROBOT 2,2,WEST');
  userEvent.click(button);
  userEvent.type(input,'PLACE_WALL 1,1');
  userEvent.click(button);
  userEvent.type(input,'PLACE_WALL 2,2');
  userEvent.click(button);
  userEvent.type(input,'PLACE_WALL 1,3');
  userEvent.click(button);
  userEvent.type(input,'LEFT');
  userEvent.click(button);
  userEvent.type(input,'LEFT');
  userEvent.click(button);
  userEvent.type(input,'MOVE');
  userEvent.click(button);
  userEvent.type(input,'REPORT');
  userEvent.click(button);
  expect(getAllByTestId('robot')[0]).toHaveAttribute('src','./images/assets/EAST.png');
  expect(getAllByTestId('robot')[0].parentElement.dataset.boxname).toEqual('Row-2,Col-3')
});

/*import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.get
  expect(linkElement).toBeInTheDocument();
});*/
