import Redux from 'redux'
import React from 'react';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import {connect} from 'react-redux';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import App from '../components/App';
import Home from '../components/home';
import Menu from '../components/menu';
import MovieList from '../components/movielist';
import MovieInfo from '../components/movieinfo';
import PrimaryTestData from '../components/_primaryTestData';
import SecondaryTestData from '../components/_secondaryTestData';


import Title from '../components/title';
import {Login as loginTest} from '../components/login';
import SearchBar from '../components/searchbar';

const babelJest = require('babel-jest');

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
};

Enzyme.configure({ adapter: new Adapter() });

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

test('Should render Title component', () => {
  const wrapper = shallow(< Title primaryMovie={PrimaryTestData} secondaryMovie={SecondaryTestData} />);
  expect(wrapper).toBeDefined();
});

test('Should render Login component', () => {
  const wrapper = shallow(<loginTest/>);
  expect(wrapper).toBeDefined();
});

test('Should render Title component', () => {
  const wrapper = shallow(<SearchBar  floatingLabelText={''}/>);
  expect(wrapper).toBeDefined();
});

test('Should render App component', () => {
  const wrapper = shallow(<App/>);
  expect(wrapper).toBeDefined();
});

test('Should render Home component', () => {
  const wrapper = shallow(<Home/>);
  expect(wrapper).toBeDefined();
});

test('Should render Menu component', () => {
  const wrapper = shallow(<Menu/>);
  expect(wrapper).toBeDefined();
});

test('Should render movielist component', () => {
  const wrapper = shallow(<MovieList movies={[]} fechmovie={function(){}}/>);
  expect(wrapper).toBeDefined();
});

test('Should render movieinfo component', () => {
  const wrapper = shallow(<MovieInfo primaryMovie={PrimaryTestData} secondaryMovie={SecondaryTestData}/>);
  expect(wrapper).toBeDefined();
});
