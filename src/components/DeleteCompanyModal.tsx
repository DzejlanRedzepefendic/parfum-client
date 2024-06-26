import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

interface DeleteCompanyDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteCompanyModal: React.FC<DeleteCompanyDialogProps> = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Da li ste sigurni da želite obrisati kompaniju?"}</DialogTitle>
            <DialogContent>
                <Typography id="alert-dialog-description">
                    Ako obrišete kompaniju, nećete moći da vratite ovu akciju. Molimo potvrdite ako ste sigurni.
                </Typography>
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

export default DeleteCompanyModal;
