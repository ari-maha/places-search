import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Search from './components/Search';
import Favourites from './components/Favourites';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Router>
          <Header />

          <Route exact path="/" component={Search} />
          <Route path="/fav" component={Favourites} />
        </Router>
      </div>
    );
  }
}

export default App;
