import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { Typography } from '@material-ui/core';
import CustomButton from '../Button';
import './style.css';

const Modal = (props) => {
    const { handleCloseAction, openModal, modalTitle, children, closeBtnLabel } = props;

    return (
        <Dialog onClose={handleCloseAction} open={openModal}>
            <MuiDialogTitle disableTypography >
                <Typography variant="h6" className="font-weight-bold">{modalTitle}</Typography>
            </MuiDialogTitle>
            <MuiDialogContent dividers>
                {children}
            </MuiDialogContent>
            <MuiDialogActions>
                <CustomButton handleAction={handleCloseAction} variant="contained" color="primary" btnLabel={closeBtnLabel}></CustomButton>
            </MuiDialogActions>
        </Dialog>
    )
}

export default Modal;

