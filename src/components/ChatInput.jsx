import React from 'react';

const ChatInput = (props) => {
	return (
		<div className="field has-addons">
			<div className="control is-expanded">
				<input className="input" type="input" value={props.message} onChange={props.handleInput} onKeyUp={props.handleInput} placeholder="Send a message." />
			</div>
			<div className="control">
				<input className="button is-success" type="button" value="Send" onClick={props.handleSend} />
			</div>
		</div>
	)
}

export default ChatInput