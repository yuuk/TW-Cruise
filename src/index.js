// for ie9
import "babel-polyfill";
import 'raf/polyfill';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import { Provider } from 'react-redux';
import configStore from 'store/store';
import ListsData from 'common/lists.data';
import Container from './container';


const store = configStore({
  lists: Immutable.fromJS(ListsData),
});

class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <Container />
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
