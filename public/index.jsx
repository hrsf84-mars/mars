import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from '../components/App';
import reducers from '../reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app'),
);
