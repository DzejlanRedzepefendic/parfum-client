import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Avatar,
  IconButton,
  Stack,
  InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

interface Article {
  name: string;
  price?: number;
  description: string;
  initialQuantity: number;
  notes: string[];
}

export const Article: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [fillOpen, setFillOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [newArticle, setNewArticle] = useState<Article>({
    name: '',
    price: undefined,
    description: '',
    initialQuantity: 0,
    notes: []
  });
  const [note, setNote] = useState('');
  const [quantityChange, setQuantityChange] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddArticle = () => {
    setArticles([...articles, newArticle]);
    setNewArticle({
      name: '',
      price: undefined,
      description: '',
      initialQuantity: 0,
      notes: []
    });
    handleClose();
  };

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

  const handleEditClick = (article: Article) => {
    setSelectedArticle(article);
    setNewArticle(article);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedArticle(null);
    setNewArticle({
      name: '',
      price: undefined,
      description: '',
      initialQuantity: 0,
      notes: []
    });
  };

  const handleEditArticle = () => {
    setArticles(
      articles.map((article) =>
        article.name === selectedArticle?.name ? newArticle : article
      )
    );
    handleEditClose();
  };

  const handleDeleteClick = (article: Article) => {
    setSelectedArticle(article);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setSelectedArticle(null);
  };

  const handleDeleteArticle = () => {
    setArticles(articles.filter((article) => article.name !== selectedArticle?.name));
    handleDeleteClose();
  };

  const handleFillClick = (article: Article) => {
    setSelectedArticle(article);
    setFillOpen(true);
  };

  const handleFillClose = () => {
    setFillOpen(false);
    setSelectedArticle(null);
    setQuantityChange(0);
  };

  const handleFillArticle = () => {
    if (selectedArticle) {
      setArticles(
        articles.map((article) =>
          article.name === selectedArticle.name
            ? { ...article, initialQuantity: article.initialQuantity + quantityChange }
            : article
        )
      );
      handleFillClose();
    }
  };

  const filteredArticles = articles.filter((article) =>
    article.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Articles</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          startIcon={<AddIcon />}
          sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45A049' } }}
        >
          Add Article
        </Button>
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          placeholder="Search Articles"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <List>
        {filteredArticles.map((article, index) => (
          <Paper key={index} elevation={3} sx={{ marginBottom: 2, padding: 2 }}>
            <ListItem>
              <Avatar sx={{ marginRight: 2 }}>
                <DescriptionIcon />
              </Avatar>
              <ListItemText
                primary={article.name}
                secondary={`Price: $${article.price || 'N/A'}, Quantity: ${article.initialQuantity}`}
              />
              <Stack direction="row" spacing={1}>
                <IconButton color="primary" onClick={() => handleEditClick(article)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDeleteClick(article)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton color="default" onClick={() => handleFillClick(article)}>
                  <LocalShippingIcon />
                </IconButton>
              </Stack>
            </ListItem>
          </Paper>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
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
            name="initialQuantity"
            label="Initial Quantity"
            type="number"
            fullWidth
            value={newArticle.initialQuantity === 0 ? '' : newArticle.initialQuantity}
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
          <Box mt={2}>
            {newArticle.notes.map((note, index) => (
              <Typography key={index} variant="body2">
                {note}
              </Typography>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddArticle} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Article</DialogTitle>
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
            name="initialQuantity"
            label="Initial Quantity"
            type="number"
            fullWidth
            value={newArticle.initialQuantity}
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
            />
            <Button
              onClick={handleAddNote}
              color="primary"
              variant="outlined"
              sx={{ marginLeft: 2, marginTop: 2 }}
            >
              Add Note
            </Button>
          </Box>
          <Box mt={2}>
            {newArticle.notes.map((note, index) => (
              <Typography key={index} variant="body2">
                {note}
              </Typography>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditArticle} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete {selectedArticle?.name}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteArticle} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={fillOpen} onClose={handleFillClose}>
        <DialogTitle>Fill Article Quantity</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="quantityChange"
            label="Quantity Change"
            type="number"
            fullWidth
            value={quantityChange === 0 ? '' : quantityChange}
            onChange={(e) => setQuantityChange(parseInt(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFillClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFillArticle} color="primary">
            Update Quantity
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Article;
