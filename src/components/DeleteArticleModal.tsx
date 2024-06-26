import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface DeleteDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteArticleModal: React.FC<DeleteDialogProps> = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Da li ste sigurni da želite obrisati parfem?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Ako obrišete parfem, nećete moći da vratite ovu akciju. Molimo potvrdite ako ste sigurni.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Ne
                </Button>
                <Button onClick={onConfirm} color="secondary" autoFocus>
                    Da
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteArticleModal;
