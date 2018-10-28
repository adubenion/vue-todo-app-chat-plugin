import React from 'react';

const ChatHeader = (props) => {
	return (
		<div>
      <section className="hero is-info">
        <div className="hero-body">
          <div className="container is-fluid">
            <h1 className="title">Just ToDo-It Chat</h1>
            <p className="subtitle">Realtime messaging for Just Todo-It</p>
          </div>
        </div>
				<nav className="navbar" role="navigation" aria-label="main navigation">
				  <div className="navbar-brand">
				    <a role="button" className={`navbar-burger burger ${props.menu ? 'is-active' : ''}`} onClick={props.handleMenu} aria-label="menu" aria-expanded="false">
				      <span aria-hidden="true"></span>
				      <span aria-hidden="true"></span>
				      <span aria-hidden="true"></span>
				    </a>
				  </div>

				  <div className={`navbar-menu ${props.menu ? 'is-active' : ''}`}>
				    <div className="navbar-start">
				      <a className="navbar-item">
				        Home
				      </a>
				      <a className="navbar-item" onClick={props.handleModal}>
				        Groups
				      </a>
				      <a className="navbar-item">
				        Login
				      </a>
				      <a className="navbar-item">
				        Log Out
				      </a>
				      <a className="navbar-item">
				        Back to Site
				      </a>
				    </div>
				  </div>
				</nav>
				<p>{props.user !== null ? `Current User: ${props.user}` : false}</p>
      </section>
		</div>
	)
}

export default ChatHeader;