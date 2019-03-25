import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const {gapi} = window;

// Client ID and API key from the Developer Console
var CLIENT_ID = '1075350288172-3hc3blj7nf9ecrndgrcargvr7tg13nmb.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAk3HgZuitwS4ZItIKJoTrcKnUZ0WkdG6A';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = [
  'https://sheets.googleapis.com/$discovery/rest?version=v4'
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

class App extends Component {
  componentDidMount() {
    gapi.load('client:auth2', this.initClient);
  }
  handleAuthClick = (event) => {
    gapi.auth2.getAuthInstance().signIn();
  }

  handleSignoutClick = (event) => {
    gapi.auth2.getAuthInstance().signOut();
  }

 initClient = () => {
    gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    })
    .then(
      function() {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

        // Handle the initial sign-in state.
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      }).catch(error => console.log("error", error));
  }

 updateSigninStatus = (isSignedIn) => {
  if (isSignedIn) {
    console.log('is signed in');
  } else {
    console.log('not signed in');
  }
}

  render() {
    return (
      <div className="App">
        <button onClick={this.handleAuthClick} >Authorize</button>
        <button onClick={this.handleSignoutClick}>Sign Out</button>
      </div>
    );
  }
}

export default App;
