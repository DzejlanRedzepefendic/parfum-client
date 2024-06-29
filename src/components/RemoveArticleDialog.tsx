// components/RemoveArticleDialog.tsx

import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';

interface RemoveArticleDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (amount: number) => void;
    articleName: string;
}

const RemoveArticleDialog: React.FC<RemoveArticleDialogProps> = ({ open, onClose, onConfirm, articleName }) => {
    const [amount, setAmount] = useState(0);

    const handleConfirm = () => {
        onConfirm(amount);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Brisanje parfema</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Da li ste sigurni da želite da obrišete parfem {articleName} iz kompanije? Ako postoji preostala količina, unesite je u polje ispod da bi bila vraćena u magacin.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Količina za vraćanje u magacin"
                    type="number"
                    fullWidth
                    value={amount || ''}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Odustani</Button>
                <Button onClick={handleConfirm} color="primary">Potvrdi</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RemoveArticleDialog;
