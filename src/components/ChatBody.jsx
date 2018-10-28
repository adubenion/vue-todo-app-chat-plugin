import React from 'react';

const ChatBody = (props) => {
	return (
		<div>
			<h1 className="title is-5">Current Group:</h1>
			<div className="box" >
				{props.previousMessages.map(message => {
					return (
					<div key={message.timestamp}>
						<p>{message.user}: {message.message}</p>
					</div>
					)
				})}
			</div>
		</div>
	)
}

export default ChatBody