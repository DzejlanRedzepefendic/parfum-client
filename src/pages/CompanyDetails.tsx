import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Card, CardContent, CardHeader, Divider, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EuroIcon from '@mui/icons-material/Euro';
import { useGetCompanyDetailsQuery } from '../api/queries/company/useGetCompanyDetailsQuery';
import { Company as CompanyType, CreateCompanyRequestData } from '../interfaces/company.interface';
import EditCompanyModal from '../components/EditCompanyModal';
import { useEditCompanyQuery } from '../api/queries/company/useEditCompanyQuery';
import { useDeleteCompanyQuery } from '../api/queries/company/useDeleteCompanyQuery';

const CompanyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetCompanyDetailsQuery(id!);
  const {mutateAsync} = useEditCompanyQuery()
  const {mutateAsync:mutateAsyncDelete} = useDeleteCompanyQuery()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleBackClick = () => {
    navigate('/company'); 
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };



  if (isLoading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (isError) {
    return <Typography color="error">Error fetching company details: {error.message}</Typography>;
  }

  if (!data) {
    return <Typography color="error">Company not found.</Typography>;
  }

  const company: CompanyType = data;

  const handleEditSave = async (updatedCompany: CreateCompanyRequestData) => {
    await mutateAsync({id:company._id,data:updatedCompany})
  };

  return (
    <Box p={2} paddingBottom={'70px'} display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" maxWidth={400} mb={2}>
        <IconButton onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <IconButton onClick={handleEditClick}>
            <EditIcon color='info' />
          </IconButton>
          <IconButton onClick={async () => await mutateAsyncDelete(company._id)}>
            <DeleteIcon color='error' />
          </IconButton>
          <IconButton onClick={() => console.log('View debt')}>
            <EuroIcon color='success' />
          </IconButton>
          <IconButton onClick={() => console.log('Add debt')}>
            <AddCircleIcon />
          </IconButton>
        </Box>
      </Box>
      <Card sx={{ width: '100%', maxWidth: 400 }}>
        <CardHeader
          title={company.name}
          titleTypographyProps={{ variant: 'h4', align: 'center' }}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>PIB</Typography>
          <Typography variant="body2">{company.pib || 'N/A'}</Typography>
          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>Address</Typography>
          <Typography variant="body2">{company.address?.street || 'N/A'}</Typography>
          <Typography variant="body2">{company.address?.city || 'N/A'}, {company.address?.state || 'N/A'}</Typography>
          <Typography variant="body2">{company.address?.zipCode || 'N/A'}, {company.address?.country || 'N/A'}</Typography>
          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>Contact</Typography>
          <Typography variant="body2"><strong>Phone:</strong> {company.contact?.phone || 'N/A'}</Typography>
          <Typography variant="body2"><strong>Email:</strong> {company.contact?.email || 'N/A'}</Typography>
          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>Bank Details</Typography>
          <Typography variant="body2"><strong>Account Number:</strong> {company.bankDetails?.accountNumber || 'N/A'}</Typography>
          <Typography variant="body2"><strong>Bank Name:</strong> {company.bankDetails?.bankName || 'N/A'}</Typography>
          <Typography variant="body2"><strong>IBAN:</strong> {company.bankDetails?.iban || 'N/A'}</Typography>
          <Typography variant="body2"><strong>SWIFT:</strong> {company.bankDetails?.swift || 'N/A'}</Typography>
          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>Description</Typography>
          <Typography variant="body2">{company.description || 'N/A'}</Typography>
        </CardContent>
      </Card>
      <EditCompanyModal
        open={isEditModalOpen}
        onClose={handleEditModalClose}
        company={company}
        onSave={handleEditSave}
      />
    </Box>
  );
};

export default CompanyDetails;
