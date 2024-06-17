import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Button,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import { Article } from '../interfaces/article.interface';
import { useEditArticleQuery } from '../api/queries/articl/useEditArticleQuery';

interface EditArticleModalProps {
  article: Article;
  open: boolean;
  onClose: () => void;
}

const EditArticleModal: React.FC<EditArticleModalProps> = ({ article, open, onClose }) => {
  const [formValues, setFormValues] = useState<Article>({ ...article });
  const [note, setNote] = useState('');
  const { mutateAsync, isError, error, isPending } = useEditArticleQuery();

  useEffect(() => {
    if (open) {
      setFormValues({ ...article });
    }
  }, [open, article]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleAddNote = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      notes: [...prevValues.notes, note]
    }));
    setNote('');
  };

  const handleSubmit = async () => {
    try {
      await mutateAsync({ data: formValues, id: article._id });
      onClose();
    } catch (err) {
      // Handle error
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Article</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={formValues.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="price"
          label="Price"
          type="number"
          fullWidth
          value={formValues.price.$numberDecimal}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          value={formValues.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="quantity"
          label="Quantity"
          type="number"
          fullWidth
          value={formValues.quantity.$numberDecimal}
          onChange={handleChange}
        />
        <Box display="flex" alignItems="center">
          <TextField
            margin="dense"
            name="note"
            label="Add Note"
            type="text"
            fullWidth
            value={note}
            onChange={(e) => setNote(e.target.value)}
            InputProps={{
              endAdornment: (
                <Button
                  onClick={handleAddNote}
                  color="primary"
                  variant="outlined"
                  sx={{ height: '100%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                >
                  <AddIcon />
                </Button>
              ),
            }}
          />
        </Box>
        <Box mt={2} display={'flex'} flexDirection={'column'} alignItems={'end'}>
          {formValues.notes.map((note, index) => (
            <Button key={index} onClick={() => {
                setFormValues((prevValues) => ({
                    ...prevValues,
                    notes: prevValues.notes.filter((_, i) => i !== index)
                }));
            }}>
              <Typography variant="body2">
                {note}
              </Typography>
              <Delete color='error' />
            </Button>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Save'}
        </Button>
      </DialogActions>
      {isError && <Typography color="error">{error?.message}</Typography>}
    </Dialog>
  );
};

export default EditArticleModal;
