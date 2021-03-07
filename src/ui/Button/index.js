import React from 'react';
import { Button } from '@material-ui/core';


const CustomButton = (props) => (<Button onClick={props.handleAction} variant={props.variant} color={props.color} disabled={props.disabled}>
    {props.btnLabel}
</Button>)

export default CustomButton;

