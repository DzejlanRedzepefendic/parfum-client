import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Button,
} from '@mui/material';
import { Company as CompanyType, CreateCompanyRequestData } from '../interfaces/company.interface';

interface EditCompanyModalProps {
  open: boolean;
  onClose: () => void;
  company: CompanyType;
  onSave: (data: CreateCompanyRequestData) => void;
}

const EditCompanyModal: React.FC<EditCompanyModalProps> = ({ open, onClose, company, onSave }) => {
  const [editedCompany, setEditedCompany] = useState<CreateCompanyRequestData>({
    name: company.name,
    pib: company.pib,
    address: company.address,
    contact: company.contact,
    bankDetails: company.bankDetails,
    description: company.description,
  });

    console.log(company);



    useEffect(() => {
    setEditedCompany({
      name: company.name,
      pib: company.pib,
      address: company.address,
      contact: company.contact,
      bankDetails: company.bankDetails,
      description: company.description,
    });
  }, [company]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCompany((prevCompany) => ({ ...prevCompany, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(editedCompany);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Izmeni musteriju</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Naziv musterije"
          type="text"
          fullWidth
          value={editedCompany.name}
          onChange={handleChange}
          required
        />
        <TextField
          margin="dense"
          name="pib"
          label="PIB"
          type="text"
          fullWidth
          value={editedCompany.pib || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="phone"
          label="Telefon"
          type="text"
          fullWidth
          value={editedCompany.contact?.phone || ''}
          onChange={(e) => setEditedCompany(prev => ({
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
          value={editedCompany.contact?.email || ''}
          onChange={(e) => setEditedCompany(prev => ({
            ...prev,
            contact: { ...prev.contact, email: e.target.value }
          }))}
        />
        <Box mt={2}>
          <TextField
            margin="dense"
            name="street"
            label="Ulica"
            type="text"
            fullWidth
            value={editedCompany.address?.street || ''}
            onChange={(e) => setEditedCompany(prev => ({
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
            value={editedCompany.address?.city || ''}
            onChange={(e) => setEditedCompany(prev => ({
              ...prev,
              address: { ...prev.address, city: e.target.value }
            }))}
          />
          <TextField
            margin="dense"
            name="state"
            label="Obalast"
            type="text"
            fullWidth
            value={editedCompany.address?.state || ''}
            onChange={(e) => setEditedCompany(prev => ({
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
            value={editedCompany.address?.zipCode || ''}
            onChange={(e) => setEditedCompany(prev => ({
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
            value={editedCompany.address?.country || ''}
            onChange={(e) => setEditedCompany(prev => ({
              ...prev,
              address: { ...prev.address, country: e.target.value }
            }))}
          />
        </Box>
        <Box mt={2}>
          <TextField
            margin="dense"
            name="accountNumber"
            label="Broj racuna"
            type="text"
            fullWidth
            value={editedCompany.bankDetails?.accountNumber || ''}
            onChange={(e) => setEditedCompany(prev => ({
              ...prev,
              bankDetails: { ...prev.bankDetails, accountNumber: e.target.value }
            }))}
          />
          <TextField
            margin="dense"
            name="bankName"
            label="Ime banke"
            type="text"
            fullWidth
            value={editedCompany.bankDetails?.bankName || ''}
            onChange={(e) => setEditedCompany(prev => ({
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
            value={editedCompany.bankDetails?.iban || ''}
            onChange={(e) => setEditedCompany(prev => ({
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
            value={editedCompany.bankDetails?.swift || ''}
            onChange={(e) => setEditedCompany(prev => ({
              ...prev,
              bankDetails: { ...prev.bankDetails, swift: e.target.value }
            }))}
          />
        </Box>
        <TextField
          margin="dense"
          name="description"
          label="Opis musterije"
          type="text"
          fullWidth
          value={editedCompany.description || ''}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCompanyModal;
