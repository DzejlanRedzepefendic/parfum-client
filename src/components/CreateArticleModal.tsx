import React, { useState } from 'react';
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
import { Article, CreateArticle } from '../interfaces/article.interface';
import { useCreateArticleQuery } from '../api/queries/articl/useCreateArticleQuery';
import { Delete } from '@mui/icons-material';

interface CreateArticleModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateArticleModal: React.FC<CreateArticleModalProps> = ({ open, onClose }) => {
  const [newArticle, setNewArticle] = useState<CreateArticle>({
    name: '',
    price: 0,
    description: '',
    quantity: 0,
    notes: []

  });
  const [note, setNote] = useState('');
  const { mutateAsync, isError, error,isPending } = useCreateArticleQuery();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewArticle((prevArticle) => ({ ...prevArticle, [name]: value }));
  };

  const handleAddNote = () => {
    setNewArticle((prevArticle) => ({
      ...prevArticle,
      notes: [...prevArticle.notes, note]
    }));
    setNote('');
  };

  const handleSubmit = async () => {
    try {
      await mutateAsync(newArticle);
      // Reset form or show success message
      setNewArticle({
        name: '',
        price: 0,
        description: '',
        quantity: 0,
        notes: []
      });
      onClose();
    } catch (err) {
      // Handle error
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Article</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={newArticle.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="price"
          label="Price"
          type="number"
          fullWidth
          value={newArticle.price}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          value={newArticle.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="quantity"
          label="Initial Quantity"
          type="number"
          fullWidth
          value={newArticle.quantity}
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
          {newArticle.notes.map((note, index) => (
            <Button>
            <Typography onClick={()=>{
                setNewArticle((prevArticle) => ({
                    ...prevArticle,
                    notes: prevArticle.notes.filter((_, i) => i !== index)
                }));
            }} key={index} variant="body2">
              {note}
            </Typography>
            <Delete  color='error' />
            </Button>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Add'}
        </Button>
      </DialogActions>
      {isError && <Typography color="error">{error?.message}</Typography>}
    </Dialog>
  );
};

export default CreateArticleModal;
