import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    Button,
    CircularProgress,
    Typography,
    TextField,
    Checkbox,
    ListItemIcon
} from '@mui/material';
import { Company as CompanyType } from '../interfaces/company.interface';
import {useGetAllArticlesQuery} from "../api/queries/articl/useGetAllArticlesQuery.ts";

interface AddArticleDialogProps {
    open: boolean;
    onClose: () => void;
    company: CompanyType;
    onAddArticle: (articleIds: string[]) => void;
}

const AddArticleInCompanyDialog: React.FC<AddArticleDialogProps> = ({ open, onClose, company, onAddArticle }) => {
    const { data: articles, isLoading } = useGetAllArticlesQuery({ name: '' });
    const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleToggleArticle = (articleId: string) => {
        setSelectedArticles(prevSelected =>
            prevSelected.includes(articleId)
                ? prevSelected.filter(id => id !== articleId)
                : [...prevSelected, articleId]
        );
    };

    const handleAddArticles = () => {
        onAddArticle(selectedArticles);
        setSelectedArticles([]);
        setSearchTerm('');
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    if (!articles) {
        return <Typography>Ne postoje dostupni parfemi.</Typography>;
    }

    const availableArticles = articles?.data?.filter(article =>
        !company.articleIds.some(id => typeof id !== 'string' && id._id === article._id) &&
        article.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Dodaj Parfem</DialogTitle>
            <DialogContent>
                <TextField
                    label="Pretraga parfema"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <List>
                    {availableArticles.map(article => (
                        <ListItem key={article._id} button onClick={() => handleToggleArticle(article._id)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={selectedArticles.includes(article._id)}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary={article.name} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Zatvori
                </Button>
                <Button onClick={handleAddArticles} color="primary" variant="contained">
                    Dodaj Izabrane
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddArticleInCompanyDialog;
