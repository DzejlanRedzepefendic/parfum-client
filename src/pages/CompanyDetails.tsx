import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Typography, CircularProgress, Card, CardContent, CardHeader,
  Divider, IconButton, TextField, Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveIcon from '@mui/icons-material/Remove';
import { useGetCompanyDetailsQuery } from '../api/queries/company/useGetCompanyDetailsQuery';
import { Company as CompanyType, CreateCompanyRequestData } from '../interfaces/company.interface';
import EditCompanyModal from '../components/EditCompanyModal';
import { useEditCompanyQuery } from '../api/queries/company/useEditCompanyQuery';
import { useDeleteCompanyQuery } from '../api/queries/company/useDeleteCompanyQuery';
import DeleteCompanyModal from '../components/DeleteCompanyModal';
import { useRefillParfums } from '../api/queries/refill/useRefillParfums';
import AddArticleInCompanyDialog from "../components/AddArticleInCompanyDialog.tsx";
import RemoveArticleDialog from '../components/RemoveArticleDialog'; // Import your new dialog
import { toast } from "react-toastify";
import {useRemoveArticleFromCompany} from "../api/queries/company/useRemoveArticleFromCompany.ts";

const CompanyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetCompanyDetailsQuery(id!);
  const { mutateAsync } = useEditCompanyQuery();
  const { mutateAsync: mutateAsyncDelete } = useDeleteCompanyQuery();
  const refillParfumsMutation = useRefillParfums();
  const removeArticleMutation = useRemoveArticleFromCompany(); // Use the remove article hook
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddArticleDialogOpen, setIsAddArticleDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [articleToRemove, setArticleToRemove] = useState<{ id: string, name: string } | null>(null);
  const [refillData, setRefillData] = useState<{ articleId: string, quantity: number }[]>([]);
  const [expiresAt, setExpiresAt] = useState('');

  const handleBackClick = () => navigate('/company');
  const handleEditClick = () => setIsEditModalOpen(true);
  const handleEditModalClose = () => setIsEditModalOpen(false);
  const handleDeleteClick = () => setIsDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setIsDeleteDialogOpen(false);
  const handleAddArticleClick = () => setIsAddArticleDialogOpen(true);
  const handleAddArticleDialogClose = () => setIsAddArticleDialogOpen(false);

  const handleConfirmDelete = async () => {
    await mutateAsyncDelete(company._id);
    setIsDeleteDialogOpen(false);
    navigate('/company');
  };

  const handleRefillChange = (articleId: string, quantity: number) => {
    if(quantity < 0) {
      quantity = 0;
    }
    setRefillData((prev) => {
      const existing = prev.find(item => item.articleId === articleId);
      if (existing) {
        return prev.map(item => item.articleId === articleId ? { ...item, quantity } : item);
      }
      return [...prev, { articleId, quantity }];
    });
  };

  const handleRefillSubmit = async () => {
    if (!expiresAt) {
      toast.error('Morate uneti datum isteka.');
      return;
    }
    const refillRequest = {
      companyId: company._id,
      expiresAt,
      articles: refillData
    };
    await refillParfumsMutation.mutateAsync(refillRequest);
    setRefillData([]); // Resetovanje inputa za dopunu
    setExpiresAt(''); // Resetovanje datuma isteka
  };

  const handleRemoveClick = (articleId: string, articleName: string) => {
    setArticleToRemove({ id: articleId, name: articleName });
    setIsRemoveDialogOpen(true);
  };

  const handleConfirmRemove = async (amount: number) => {
    if (!articleToRemove) return;
    await removeArticleMutation.mutateAsync({ companyId: company._id, articleId: articleToRemove.id, amount });
    setIsRemoveDialogOpen(false);
    setArticleToRemove(null);
  };

  if (isLoading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (isError) {
    return <Typography color="error">Greška: {error.message}</Typography>;
  }

  if (!data) {
    return <Typography color="error">Musterija nije pronađena.</Typography>;
  }

  const company: CompanyType = data;

  const handleEditSave = async (updatedCompany: CreateCompanyRequestData) => {
    await mutateAsync({ id: company._id, data: updatedCompany });
  };

  const handleAddArticlesToCompany = async (articleIds: string[]) => {
    const updatedArticleIds = company.articleIds.map(a => typeof a === 'string' ? a : a._id);
    const newArticleIds = [...updatedArticleIds, ...articleIds];
    const updatedCompany = {
      ...company,
      articleIds: newArticleIds
    };
    await mutateAsync({ id: company._id, data: updatedCompany as CreateCompanyRequestData });
    setIsAddArticleDialogOpen(false);
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
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon color='error' />
            </IconButton>
            <IconButton onClick={handleAddArticleClick}>
              <AddCircleIcon />
            </IconButton>
          </Box>
        </Box>

        <AddArticleInCompanyDialog
            open={isAddArticleDialogOpen}
            onClose={handleAddArticleDialogClose}
            company={company}
            onAddArticle={handleAddArticlesToCompany}
        />

        <Box width="100%" maxWidth={400} mb={2}>
          {company.articleIds?.map((article) => (
              <Card key={typeof article === 'string' ? article : article._id} sx={{ mb: 2 }}>
                <CardHeader
                    title={typeof article === 'string' ? article : article.name}
                    action={
                        typeof article !== 'string' && (
                            <IconButton onClick={() => handleRemoveClick(article._id, article.name)}>
                              <RemoveIcon color='error' />
                            </IconButton>
                        )
                    }
                />
                <CardContent>
                  {typeof article !== 'string' && (
                      <>
                        <Typography variant="body2"><strong>Količina iz magacina:</strong> {article.quantity.$numberDecimal}</Typography>
                        <TextField
                            margin="dense"
                            label="Dopuna količine"
                            type="number"
                            fullWidth
                            value={refillData.find(item => item.articleId === article._id)?.quantity || ''}

                            onChange={(e) => handleRefillChange(article._id, Number(e.target.value))}
                        />
                      </>
                  )}
                </CardContent>
              </Card>
          ))}
        </Box>
        <TextField
            label="Datum isteka"
            type="date"
            fullWidth
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
        />
        <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleRefillSubmit}
        >
          Dopuni parfeme
        </Button>
        <Card sx={{ width: '100%', maxWidth: 400, marginTop: '20px' }}>
          <CardHeader
              title={company.name}
              titleTypographyProps={{ variant: 'h4', align: 'center' }}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>PIB</Typography>
            <Typography variant="body2">{company.pib || 'N/A'}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>Adresa</Typography>
            <Typography variant="body2">{company.address?.street || 'N/A'}</Typography>
            <Typography variant="body2">{company.address?.city || 'N/A'}, {company.address?.state || 'N/A'}</Typography>
            <Typography variant="body2">{company.address?.zipCode || 'N/A'}, {company.address?.country || 'N/A'}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>Kontakt</Typography>
            <Typography variant="body2"><strong>Telefon:</strong> {company.contact?.phone || 'N/A'}</Typography>
            <Typography variant="body2"><strong>Email:</strong> {company.contact?.email || 'N/A'}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>Bankovni detalji</Typography>
            <Typography variant="body2"><strong>Broj računa:</strong> {company.bankDetails?.accountNumber || 'N/A'}</Typography>
            <Typography variant="body2"><strong>Ime banke:</strong> {company.bankDetails?.bankName || 'N/A'}</Typography>
            <Typography variant="body2"><strong>IBAN:</strong> {company.bankDetails?.iban || 'N/A'}</Typography>
            <Typography variant="body2"><strong>SWIFT:</strong> {company.bankDetails?.swift || 'N/A'}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>Opis musterije</Typography>
            <Typography variant="body2">{company.description || 'N/A'}</Typography>
          </CardContent>
        </Card>
        <EditCompanyModal
            open={isEditModalOpen}
            onClose={handleEditModalClose}
            company={company}
            onSave={handleEditSave}
        />
        <DeleteCompanyModal
            open={isDeleteDialogOpen}
            onClose={handleCloseDeleteDialog}
            onConfirm={handleConfirmDelete}
        />
        {articleToRemove && (
            <RemoveArticleDialog
                open={isRemoveDialogOpen}
                onClose={() => setIsRemoveDialogOpen(false)}
                onConfirm={handleConfirmRemove}
                articleName={articleToRemove.name}
            />
        )}
      </Box>
  );
};

export default CompanyDetails;
