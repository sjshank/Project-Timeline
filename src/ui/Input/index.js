import React from 'react';


const CustomInput = (props) => (<input
    type={props.type}
    style={{ overflow: 'hidden' }}
    className={`form-control mr-2 p-1`}
    id={props.id}
    accept={props.fileTypes ? props.fileTypes : ''}
    onChange={props.handleChange}
    placeholder={props.placeholder}
    title={props.title}
/>)

export default CustomInput;

