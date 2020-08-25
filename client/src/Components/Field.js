import React from 'react';
import PropTypes from 'prop-types';
import './Edit.css'
const Field = (props) => (
	<div>
	
		<h4>What's Your Name</h4>
		<div id="feed" class="ui input">

			<input onChange = {props.onChange}
			type = {props.textarea ? 'textarea': 'text'}
			value = {props.value}type="text" placeholder={props.label}
			
			/>
		</div>
		
			
	
	</div>
);

Field.propTypes = {
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	textarea: PropTypes.bool.isRequired,
	value: PropTypes.string.isRequired,
};

Field.defaultProps = {
	textarea: false,
};

export default Field;
