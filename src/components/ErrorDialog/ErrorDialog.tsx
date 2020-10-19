import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import React from 'react';

export interface ErrorDialogProps {
    open: boolean;
    onClose: any;
}

const ErrorDialog: React.FC<ErrorDialogProps> = (props: ErrorDialogProps) => (
    <Dialog open={props.open}>
        <DialogTitle>An Error occured</DialogTitle>
        <DialogContent>
            <DialogContentText>Something went wrong!</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button color="primary" onClick={props.onClose} autoFocus>
                Close
            </Button>
        </DialogActions>
    </Dialog>
);
export default ErrorDialog;
