import React from 'react';

const ChatBody = (props) => {
	return (
		<div>
			<div className="box">
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