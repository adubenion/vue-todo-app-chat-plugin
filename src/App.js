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
import LoginModal from './components/LoginModal.jsx';

axios.defaults.withCredentials = true

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: localStorage.getItem('ta_cu') || null,
      loggedIn: false,
      loginModal: false,
      username: '',
      password: '',
      menu: false,
      menuModal: false,
      groups: [],
      currentGroup: '',
      message : '',
      prevMessages : []
    }
    this.cookies = new Cookies();
    this.firebase = fb;
    this.testGroupRef = testGroupRef;
    this.app = app;
    this.db = db;
    this.testGroupRef.limitToLast(10).on('value', snapshot => {
      var prev = []
      snapshot.forEach(child => {
        prev.push(child.val())
      })
      this.setState({prevMessages: prev})
    })
    this.checkAuth = () => {
      axios.get('http://localhost:3000/auth', {headers: {'token':this.cookies.get('todo_app')}})
      .then(response => {
        if (!(response.status > 200)) {
          var user = this.state.user;
          var loggedIn = this.state.loggedIn;
          var loginModal = this.state.loginModal;
          user = response.data.auth;
          loggedIn = true;
          loginModal = false;
          this.setState({
            user: user,
            loggedIn: loggedIn,
            loginModal: loginModal
          }, () => localStorage.setItem('ta_cu', response.data.auth))
          return axios.get('http://localhost:3000/api/groups', {headers: {'token':this.cookies.get('todo_app')}})
          .then(response => {
            if (!(response > 200)) {
              return response.data
            }
          })
          .then(data => {
            var groups = data;
            return this.setState({groups: groups})
          })
          .catch(e => {
              console.log(e.message)
          })
        }
      })
      .catch(e => {
        console.log(e.message)
        var loggedIn = this.state.loggedIn;
        var loginModal = this.state.loginModal
        loggedIn = false;
        loginModal = true
        this.setState({
          loggedIn: loggedIn,
          loginModal: loginModal
        })
      })
    }
    this.checkAuth()
  }

  componentDidMount() {

  }

  handleInput(e) {
    if (e.keyCode !== undefined && e.keyCode === 13)
      return this.handleSend();
    else {
      return this.setState({message: e.target.value})
    }
  }

  handleLoginInput(e) {
    if (e.keyCode !== undefined && e.keyCode === 13) {
      return this.handleLogin()
    } else {
      var name = e.target.name
      var value = e.target.value
      return this.setState({[name]: value})
    }
  }

  handleLogin() {
    if (this.state.username === '' || this.state.password === '') return false
    axios.post('http://localhost:3000/login/do', {
      username: this.state.username,
      password: this.state.password
    }).then(response => {
      return response.data
    }).then(data => {
      if (data !== null && data.status !== 'error') {
        this.cookies.set('todo_app', `${data.token}`, '1H')
        localStorage.setItem('ta_cu', this.state.username)
        return this.setState({
          user: this.state.username,
          username: '',
          password: '',
          loggedIn: true,
          loginModal: false
        }, this.checkAuth())
      }
    })
    .catch(e => {
      console.log(e.message)
    })
  }

  handleLogout() {
    this.cookies.remove('todo_app')
    localStorage.removeItem('ta_cu')
    return this.checkAuth();
  }

  handleSend(e) {
    this.checkAuth()
    if (loggedIn === false) return false
    if (this.user === null || this.cookies.get('todo_app') === undefined) {
      var loggedIn = this.state.loggedIn;
      var loginModal = this.state.loginModal;
      loggedIn = false;
      loginModal = false;
      this.setState({
        loggedIn: loggedIn,
        loginModal: loginModal
      })
      return false
    }
    this.sendMessage()
  }

  handleMenu() {
    var menu = this.state.menu;
    this.setState({menu: !menu})
  }

  handleModal() {
    var menuModal = this.state.menuModal;
    this.setState({menuModal: !menuModal})
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
        <LoginModal 
        loginModal={this.state.loginModal}
        handleLoginInput={this.handleLoginInput.bind(this)}
        handleLogin={this.handleLogin.bind(this)}
        username={this.state.username}
        password={this.state.password}

         />
        <ChatHeader 
        user={this.state.user} 
        menu={this.state.menu} 
        handleMenu={this.handleMenu.bind(this)}
        handleLogout={this.handleLogout.bind(this)}
        handleModal={this.handleModal.bind(this)} 
        />
        <GroupsModal 
        groups={this.state.groups} 
        menuModal={this.state.menuModal} 
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
