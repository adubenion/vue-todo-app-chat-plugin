import React from 'react';

const ChatInput = (props) => {
	return (
		<div className="field has-addons">
			<div className="control is-expanded">
				<input className="input" type="input" placeholder="Send a message." />
			</div>
			<div className="control">
				<input className="button is-success" type="button" value="Send" />
			</div>
		</div>
	)
}

export default ChatInput