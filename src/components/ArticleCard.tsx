import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BatteryCharging20Outlined } from '@mui/icons-material';
import { Box, Chip, Stack } from '@mui/material';
import EditArticleModal from './EditArticleModal'; // Import the modal
import { DecimalValue } from '../interfaces/article.interface';
import { useDeleteArticleQuery } from '../api/queries/articl/useDeleteArticleQuery.ts';
import DeleteArticleModal from "./DeleteArticleModal.tsx";
import QuantityEditModal from "./QuantityEditModal.tsx";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface Article {
  _id: string;
  name: string;
  price: DecimalValue;
  description: string;
  quantity: DecimalValue;
  notes: string[];
}

const ArticleCard: React.FC<Article> = ({ name, price, description, quantity, notes, _id }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isQuantityEditDialogOpen, setIsQuantityEditDialogOpen] = useState(false);
  const { mutateAsync } = useDeleteArticleQuery();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    await mutateAsync(_id);
    setIsDeleteDialogOpen(false);
  };

  const handleQuantityEditClick = () => {
    setIsQuantityEditDialogOpen(true);
  };

  const handleCloseQuantityEditDialog = () => {
    setIsQuantityEditDialogOpen(false);
  };

  return (
      <Card sx={{ marginBottom: 2 }}>
        <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="article">
                {name.charAt(0)}
              </Avatar>
            }
            title={name}
            subheader={`Kolicina: ${quantity.$numberDecimal}`}
        />
        <CardActions disableSpacing>
          <IconButton color="primary" onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="primary" onClick={handleQuantityEditClick}>
            <BatteryCharging20Outlined />
          </IconButton>
          <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="vidi vise"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="h6">Opis Parfema</Typography>
              <Typography paragraph>{description}</Typography>
            </Box>
            <Box>
              <Typography variant="h6">Note</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} justifyContent={'start'}>
                {notes.map((note, index) => (
                    <Chip key={index} label={note} sx={{ marginBottom: 1 }} />
                ))}
              </Stack>
            </Box>
          </CardContent>
        </Collapse>
        <EditArticleModal
            article={{ name, price, description, quantity, notes, _id }}
            open={isEditModalOpen}
            onClose={handleCloseModal}
        />
        <DeleteArticleModal
            open={isDeleteDialogOpen}
            onClose={handleCloseDeleteDialog}
            onConfirm={handleConfirmDelete}
        />
        <QuantityEditModal
            article={{ name, price, description, quantity, notes, _id }}
            open={isQuantityEditDialogOpen}
            onClose={handleCloseQuantityEditDialog}
        />
      </Card>
  );
};

export default ArticleCard;
