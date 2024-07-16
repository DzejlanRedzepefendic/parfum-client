import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box, Typography, CircularProgress, Card, CardContent, IconButton, TextField, Button, Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useGetCompanyDetailsQuery } from '../api/queries/company/useGetCompanyDetailsQuery';
import { Company as CompanyType, CreateCompanyRequestData } from '../interfaces/company.interface';
import EditCompanyModal from '../components/EditCompanyModal';
import { useEditCompanyQuery } from '../api/queries/company/useEditCompanyQuery';
import { useDeleteCompanyQuery } from '../api/queries/company/useDeleteCompanyQuery';
import { useRefillParfums } from '../api/queries/refill/useRefillParfums';
import AddArticleInCompanyDialog from "../components/AddArticleInCompanyDialog.tsx";
import RemoveArticleDialog from '../components/RemoveArticleDialog';
import { toast } from "react-toastify";
import { useRemoveArticleFromCompany } from "../api/queries/company/useRemoveArticleFromCompany.ts";
import DeleteCompanyModal from "../components/DeleteCompanyModal.tsx";
import CompanyDetailsContent from '../components/CompanyDetailsContent';

const CompanyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetCompanyDetailsQuery(id!);
  const { mutateAsync } = useEditCompanyQuery();
  const { mutateAsync: mutateAsyncDelete } = useDeleteCompanyQuery();
  const refillParfumsMutation = useRefillParfums();
  const removeArticleMutation = useRemoveArticleFromCompany();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddArticleDialogOpen, setIsAddArticleDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [articleToRemove, setArticleToRemove] = useState<{ id: string, name: string } | null>(null);
  const [refillData, setRefillData] = useState<{ articleId: string, quantity: number }[]>([]);
  const [expiresAt, setExpiresAt] = useState('');
  const [filledAt, setFilledAt] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [isContentVisible, setIsContentVisible] = useState(false);

  const handleBackClick = () => navigate('/company');
  const handleEditClick = () => setIsEditModalOpen(true);
  const handleEditModalClose = () => setIsEditModalOpen(false);
  const handleDeleteClick = () => setIsDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setIsDeleteDialogOpen(false);
  const handleAddArticleClick = () => setIsAddArticleDialogOpen(true);
  const handleAddArticleDialogClose = () => setIsAddArticleDialogOpen(false);
  const toggleContent = () => setIsContentVisible(!isContentVisible);

  const handleConfirmDelete = async () => {
    await mutateAsyncDelete(company._id);
    setIsDeleteDialogOpen(false);
    navigate('/company');
  };

  const handleRefillChange = (articleId: string, quantity: number) => {
    if (quantity < 0) {
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
      filledAt,
      description,
      articles: refillData
    };
    await refillParfumsMutation.mutateAsync(refillRequest);
    setRefillData([]);
    setExpiresAt('');
    setFilledAt(new Date().toISOString().split('T')[0]);
    setDescription('');
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
  console.log(company,"company")


  const handleEditSave = async (updatedCompany: CreateCompanyRequestData) => {
    await mutateAsync({ id: company._id, data: updatedCompany });
  };

  const handleAddArticlesToCompany = async (articleIds: string[]) => {
    const updatedArticleIds = company.articles.map(a => typeof a === 'string' ? a : a._id);
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
          {company.articles?.map((article) => (
              <Card key={typeof article === 'string' ? article : article._id} sx={{ mb: 2 }}>
                <CardContent>
                  {typeof article !== 'string' && (
                      <>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="h6" gutterBottom>{company.name}</Typography>
                          <IconButton onClick={() => handleRemoveClick(article._id, article.name)}>
                            <CloseIcon color='error' />
                          </IconButton>
                        </Box>
                        <Typography variant="body2" color="textSecondary">{article.name}</Typography>
                        <Divider sx={{ my: 1 }} />
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
            sx={{ mb: 2 }}
        />
        <TextField
            label="Datum dopune"
            type="date"
            fullWidth
            value={filledAt}
            onChange={(e) => setFilledAt(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
        />
        <TextField
            label="Opis"
            type="text"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
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
        <Button
            onClick={()=>{navigate(`/company-information`,{state:company})}}
            variant="contained" fullWidth sx={{marginTop:'20px'}}>
            Vidi informacije o kompaniji
        </Button>
        <Button
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={toggleContent}
        >
          {isContentVisible ? 'Sakrij detalje kompanije' : 'Prikaži detalje kompanije'}
        </Button>
        {isContentVisible && <CompanyDetailsContent company={company} />}
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
