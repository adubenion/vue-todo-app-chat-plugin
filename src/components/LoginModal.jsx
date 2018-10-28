import React from 'react';

const confirmClose = () => {
	var confirm = window.confirm("Cancelling will close this window. Are you sure?")
	if (confirm) {
		return window.close()
	} else {
		return false
	}
}

const LoginModal = (props) => {
	return (
		<div className={`modal ${props.loginModal? 'is-active' : false}`}>;
		  <div className="modal-background" onClick={props.handleModal} ></div>
		  <div className="modal-content">
		  	<div className="box">
		  		<h1 className="title is-5">Log In</h1>
		  		<p className="subtitle">Please log in to use chat</p>
		  		<div className="field" >
			  		<input className="input" type="input" name="username" value={props.username} placeholder="username" onChange={props.handleLoginInput} onKeyUp={props.handleLogin} />
		  		</div>
		  		<div className="field" >
			  		<input className="input" type="password" name="password" value={props.password} placeholder="password" onChange={props.handleLoginInput} onKeyUp={props.handleLogin} />
		  		</div>
		  		<div className="field is-grouped" >
		  			<button className="button is-success" onClick={props.handleLogin} >Login</button>
		  			<button className="button is-danger" onClick={confirmClose}>Cancel</button>
		  		</div>
		  	</div>
		  </div>
		</div>
	)
}

export default LoginModal;