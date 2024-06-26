import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CreateCompanyModal from '../components/CreateCompanyModal';
import { useGetAllCompanyQuery } from '../api/queries/company/useGetAllCompanyQuery';
import { CompanyCard } from '../components/CompanyCard';
import { QueryParams } from '../interfaces/global.interface';
import { Company as CompanyType } from '../interfaces/company.interface';

export const Company: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, ] = useState(1);
  const [limit, ] = useState(9999);
  const [sortBy, ] = useState('ASC');

  const queryParamas: QueryParams = { page, limit, sortBy, name: searchTerm };
  const { data, isLoading, isError, error } = useGetAllCompanyQuery(queryParamas);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };



  return (
    <Box p={2} paddingBottom={'50px'}>
      <Box display="flex" justifyContent="end" alignItems="center" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          startIcon={<AddIcon />}
          sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45A049' } }}
        >
          Dodaj musteriju
        </Button>
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          placeholder="Pretrazi po nazivu..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {isLoading && <CircularProgress />}
      {isError && <p>Error: {error.message}</p>}
      {data && data.map((company: CompanyType, index: number) => (
        <CompanyCard key={index} company={company} />
      ))}
      <CreateCompanyModal
        onClose={handleClose}
        open={open}
      />
    </Box>
  );
};

export default Company;
