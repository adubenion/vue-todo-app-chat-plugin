import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.css'
import { app, db, testGroupRef } from './firebase'



import ChatInput from './components/ChatInput.jsx';
import ChatBody from './components/ChatBody.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message : '',
      prevMessages : []
    }
    this.testGroupRef = db.ref('groups/test group');
    this.testGroupRef.on('value', snapshot => {
      var prev = []
      snapshot.forEach(child => {
        prev.push(child.val())
      })
      this.setState({prevMessages: prev})
    })
  }


  render() {
    return (
      <div>
        <section className="hero is-info">
          <div className="hero-body">
            <div className="container is-fluid">
              <h1 className="title">Just ToDo-It Chat</h1>
              <p className="subtitle">Chat Plugin</p>
            </div>
          </div>
        </section>
        <ChatBody previousMessages={this.state.prevMessages} />
        <ChatInput />
      </div>
    );
  }
}

export default App;
