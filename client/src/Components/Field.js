import React from 'react';
import PropTypes from 'prop-types';

const Field = (props) => (
	<div>
		<label>{props.label}</label>
		<input 
			onChange = {props.onChange}
			type = {props.textarea ? 'textarea': 'text'}
			value = {props.value}
	/>
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
