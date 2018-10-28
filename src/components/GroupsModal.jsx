import React from 'react';

const GroupsModal = (props) => {
	return (
		<div className={`modal ${props.modal? 'is-active' : false}`}>;
		  <div className="modal-background" onClick={props.handleModal} ></div>
		  <div className="modal-content">
		  	<div className="box">
		  		<h1 className="title is-5">Select group for chat</h1>
		  		{props.groups.map(group => {
		  			return (
		  					<div key={group._id}>
		  						<a className="subtitle" >{group.name}</a>
		  					</div>
		  				)
		  		})}
		  	</div>
		  </div>
		</div>
	)
}

export default GroupsModal;