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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useCreateCompanyQuery } from '../api/queries/company/useCreateCompanyQuery';
import { CreateCompanyRequestData } from '../interfaces/company.interface';

interface CreateCompanyModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateCompanyModal: React.FC<CreateCompanyModalProps> = ({ open, onClose }) => {
  const [newCompany, setNewCompany] = useState<CreateCompanyRequestData>({
    name: '',
  });
  const [showAddress, setShowAddress] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const { mutateAsync, isError, error, isPending } = useCreateCompanyQuery();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCompany((prevCompany) => ({ ...prevCompany, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await mutateAsync(newCompany);
      setNewCompany({
        name: '',
      });
      onClose();
    } catch (err) {
      // Handle error
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Dodaj novog musteriju</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Naziv musterije"
          type="text"
          fullWidth
          value={newCompany.name}
          onChange={handleChange}
          required
        />
        <TextField
          margin="dense"
          name="phone"
          label="Telefon"
          type="text"
          fullWidth
          value={newCompany.contact?.phone || ''}
          onChange={(e) => setNewCompany(prev => ({
            ...prev,
            contact: { ...prev.contact, phone: e.target.value }
          }))}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={newCompany.contact?.email || ''}
          onChange={(e) => setNewCompany(prev => ({
            ...prev,
            contact: { ...prev.contact, email: e.target.value }
          }))}
        />
        <Button
          fullWidth
          onClick={() => setShowAddress(!showAddress)}
          color="primary"
          sx={{ mt: 2, justifyContent: 'space-between' }}
        >
          {showAddress ? 'Sakrij adresu' : 'Dodaj adresu'}
          {showAddress ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Button>
        {showAddress && (
          <Box mt={2}>
            <TextField
              margin="dense"
              name="street"
              label="Ulica"
              type="text"
              fullWidth
              value={newCompany.address?.street || ''}
              onChange={(e) => setNewCompany(prev => ({
                ...prev,
                address: { ...prev.address, street: e.target.value }
              }))}
            />
            <TextField
              margin="dense"
              name="city"
              label="Grad"
              type="text"
              fullWidth
              value={newCompany.address?.city || ''}
              onChange={(e) => setNewCompany(prev => ({
                ...prev,
                address: { ...prev.address, city: e.target.value }
              }))}
            />
            <TextField
              margin="dense"
              name="state"
              label="Oblast"
              type="text"
              fullWidth
              value={newCompany.address?.state || ''}
              onChange={(e) => setNewCompany(prev => ({
                ...prev,
                address: { ...prev.address, state: e.target.value }
              }))}
            />
            <TextField
              margin="dense"
              name="zipCode"
              label="Zip kod"
              type="text"
              fullWidth
              value={newCompany.address?.zipCode || ''}
              onChange={(e) => setNewCompany(prev => ({
                ...prev,
                address: { ...prev.address, zipCode: e.target.value }
              }))}
            />
            <TextField
              margin="dense"
              name="country"
              label="Drzava"
              type="text"
              fullWidth
              value={newCompany.address?.country || ''}
              onChange={(e) => setNewCompany(prev => ({
                ...prev,
                address: { ...prev.address, country: e.target.value }
              }))}
            />
          </Box>
        )}
        <Button
          fullWidth
          onClick={() => setShowBankDetails(!showBankDetails)}
          color="primary"
          sx={{ mt: 2, justifyContent: 'space-between' }}
        >
          {showBankDetails ? 'Sakrij detalje banke' : 'Dodaj bankovne detalje'}
          {showBankDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Button>
        {showBankDetails && (
          <Box mt={2}>
            <TextField
              margin="dense"
              name="accountNumber"
              label="Broj racuna"
              type="text"
              fullWidth
              value={newCompany.bankDetails?.accountNumber || ''}
              onChange={(e) => setNewCompany(prev => ({
                ...prev,
                bankDetails: { ...prev.bankDetails, accountNumber: e.target.value }
              }))}
            />
            <TextField
              margin="dense"
              name="bankName"
              label="Naziv banke"
              type="text"
              fullWidth
              value={newCompany.bankDetails?.bankName || ''}
              onChange={(e) => setNewCompany(prev => ({
                ...prev,
                bankDetails: { ...prev.bankDetails, bankName: e.target.value }
              }))}
            />
            <TextField
              margin="dense"
              name="iban"
              label="IBAN"
              type="text"
              fullWidth
              value={newCompany.bankDetails?.iban || ''}
              onChange={(e) => setNewCompany(prev => ({
                ...prev,
                bankDetails: { ...prev.bankDetails, iban: e.target.value }
              }))}
            />
            <TextField
              margin="dense"
              name="swift"
              label="SWIFT"
              type="text"
              fullWidth
              value={newCompany.bankDetails?.swift || ''}
              onChange={(e) => setNewCompany(prev => ({
                ...prev,
                bankDetails: { ...prev.bankDetails, swift: e.target.value }
              }))}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Odustani
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={isPending}>
          {isPending ? 'Dodavanje...' : 'Dodaj musteriju'}
        </Button>
      </DialogActions>
      {isError && <Typography color="error">{error?.message}</Typography>}
    </Dialog>
  );
};

export default CreateCompanyModal;
