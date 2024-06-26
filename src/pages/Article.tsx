import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CreateArticleModal from '../components/CreateArticleModal';
import { useGetAllArticlesQuery } from '../api/queries/articl/useGetAllArticlesQuery';
import ArticleCard from '../components/ArticleCard';

interface Article {
  _id: string;
  name: string;
  price?: number;
  description: string;
  initialQuantity: number;
  notes: string[];
}

export const Article: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const {data} = useGetAllArticlesQuery({
    name: searchTerm
  });


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Box p={2} paddingBottom={'50px'}>
      <Box display="flex"  justifyContent="end" alignItems="center" mb={2}>
        {/* <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Articles</Typography>   */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          startIcon={<AddIcon />}
          sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45A049' } }}
        >
          Dodaj Parfem
        </Button>
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          placeholder="Pretraži parfeme..."
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
      {data?.data?.map((article, index) => (
        <ArticleCard key={index} {...article} />
      ))}
      <CreateArticleModal
      onClose={handleClose}
      open={open}
      />
    </Box>
  );
};

export default Article;
