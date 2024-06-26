import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Typography
} from '@mui/material';
import { Article } from '../interfaces/article.interface';
import { useEditArticleQuery } from '../api/queries/articl/useEditArticleQuery';

interface QuantityEditDialogProps {
    article: Article;
    open: boolean;
    onClose: () => void;
}

const QuantityEditModal: React.FC<QuantityEditDialogProps> = ({ article, open, onClose }) => {
    const [quantity, setQuantity] = useState(article.quantity.$numberDecimal);
    const { mutateAsync, isError, error, isPending } = useEditArticleQuery();

    useEffect(() => {
        if (open) {
            setQuantity(article.quantity.$numberDecimal);
        }
    }, [open, article]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            await mutateAsync({ data: { ...article, quantity: { $numberDecimal: quantity } }, id: article._id });
            onClose();
        } catch (err) {
            // Handle error
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Izmeni Količinu Parfema</DialogTitle>
            <Typography
                variant="h6"
                color="textSecondary"
                sx={{ mt: 2, ml: 2 }}
            >
                Trenutna kolicina : {article.quantity.$numberDecimal}
            </Typography>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="quantity"
                    label="Količina"
                    type="number"
                    fullWidth
                    value={quantity}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Odustani
                </Button>
                <Button onClick={handleSubmit} color="primary" disabled={isPending}>
                    {isPending ? 'Izmena Količine...' : 'Izmeni Količinu'}
                </Button>
            </DialogActions>
            {isError && <Typography color="error">{error?.message}</Typography>}
        </Dialog>
    );
};

export default QuantityEditModal;
