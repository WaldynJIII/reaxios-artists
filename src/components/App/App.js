// App.js

import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ArtistList from './../ArtistList/ArtistList.js';
import ArtistForm from './../ArtistForm/ArtistForm'
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  // Called when the (App) component is created
  state = {
   
  }
  
  // DOM is ready
  componentDidMount() { // react Component method
    this.refreshArtists();
  }

  refreshArtists = () => {
    // just like $.ajax()
    axios({
      method: 'GET',
      url: '/artist'
    }).then((response) => {
      console.log(response);
      // response.data will be the array of artists
      this.props.dispatch({type: 'SET_ARTISTS', payload: response.data})
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Famous Artists Are Great!</h1>
        </header>
        <Router>
          <div>
           
              <ul className="nav">
                <li>
                  <Link to="/">Artist List</Link>
                </li>
                <li>
                  <Link to="/artistForm">Artist Form</Link>
                </li>
              </ul>  
        <br/>
        <Route exact path="/" component={ArtistList} refreshArtists={this.refreshArtists} artistList={this.props.reduxStore.artistReducer} />
            <Route exact path="/artistForm" component={ArtistForm} getArtists={this.refreshArtists}/>
          </div>
        </Router>
      </div>
    );
  }
}
const mapReduxStoreToProps = (reduxStore) => ({
  reduxStore: reduxStore
})
export default connect(mapReduxStoreToProps)(App);
