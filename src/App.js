import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter } from 'react-router-dom';
import './App.css';

import routes from './routes';


class App extends Component {
  render() {
    return (
      <div className="app"> 
     
      {routes}   
     
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps)(App));
