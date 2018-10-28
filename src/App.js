import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.css'
import { app, db, testGroupRef, fb } from './firebase'
import axios from 'axios';
import Cookies from 'universal-cookie'

import ChatInput from './components/ChatInput.jsx';
import ChatBody from './components/ChatBody.jsx';
import ChatHeader from './components/ChatHeader.jsx';
import GroupsModal from './components/GroupsModal.jsx';

axios.defaults.withCredentials = true

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: localStorage.getItem('ta_cu') || null,
      groups: [],
      currentGroup: '',
      menu: true,
      modal: false,
      message : '',
      prevMessages : []
    }
    this.cookies = new Cookies();
    this.firebase = fb;
    this.testGroupRef = testGroupRef;
    this.app = app;
    this.db = db;
    this.testGroupRef.on('value', snapshot => {
      var prev = []
      snapshot.forEach(child => {
        prev.push(child.val())
      })
      this.setState({prevMessages: prev})
    })
  }

  componentDidMount() {
    axios.get('http://localhost:3000/auth', {headers: {'token':this.cookies.get('todo_app')}})
    .then(response => {
      if (!(response.status > 200)) {
        return axios.get('http://localhost:3000/api/groups', {headers: {'token':this.cookies.get('todo_app')}})
        .then(response => {
          if (!(response > 200)) {
            return response.data
          }
        })
        .then(data => {
          var groups = data;
          this.setState({groups: groups})
        })
        .catch(e => {
            console.log(e.message)
        })
      }
    })
  }

  handleInput(e) {
    if (e.keyCode !== undefined && e.keyCode === 13)
      return this.sendMessage();
    else {
      return this.setState({message: e.target.value})
    }
  }
  handleSend(e) {
    e.preventDefault();
    this.sendMessage()
  }

  handleMenu() {
    var menu = this.state.menu;
    this.setState({menu: !menu})
  }

  handleModal() {
    var modal = this.state.modal;
    this.setState({modal: !modal})
  }

  sendMessage() {
    if (this.state.message === '') return false
    this.testGroupRef.push({
      user: 'adubenion',
      message: this.state.message,
      timestamp: this.firebase.database.ServerValue.TIMESTAMP
    }, () => this.setState({message: ''}))
  }

  render() {
    return (
      <div>
        <ChatHeader 
        user={this.state.user} 
        menu={this.state.menu} 
        handleMenu={this.handleMenu.bind(this)} 
        handleModal={this.handleModal.bind(this)} 
        />
        <GroupsModal 
        groups={this.state.groups} 
        modal={this.state.modal} 
        handleModal={this.handleModal.bind(this)} 
        />
        <ChatBody 
        previousMessages={this.state.prevMessages} 
        />
        <ChatInput 
        message={this.state.message} 
        handleInput={this.handleInput.bind(this)} 
        handleSend={this.handleSend.bind(this)} 
        />
      </div>
    );
  }
}

export default App;
