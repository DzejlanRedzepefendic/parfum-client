import React from 'react';
import { Card, CardContent, CardHeader, Typography, Avatar, IconButton, Box } from '@mui/material';
import { Company as CompanyType } from '../interfaces/company.interface';
import BusinessIcon from '@mui/icons-material/Business';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import {Note} from "@mui/icons-material";

interface CompanyCardProps {
    company: CompanyType;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate(`/company/${company._id}`);
    };

    const handleNavigateToCompanyRefillDetail = () => {
        navigate(`/company/${company._id}/refills`);
    }

    const { latestRefill } = company;

    return (
        <Card variant="outlined" sx={{ mb: 2, padding: 2 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: '#4CAF50' }}>
                        <BusinessIcon />
                    </Avatar>
                }
                action={
                <>
                    <IconButton onClick={handleNavigateToCompanyRefillDetail}>
                        <Note />
                    </IconButton>
                    <IconButton onClick={handleDetailsClick}>
                        <ArrowForwardIcon />
                    </IconButton>
                </>
                }
                title={
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {company.name}
                    </Typography>
                }
            />
            <CardContent>
                {latestRefill && (
                    <Box>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Napunjeno:</strong> {new Date(latestRefill.filledAt).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Ističe:</strong> {new Date(latestRefill.expiresAt).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Preostalo vreme:</strong> {latestRefill.formattedRemainingTime}
                        </Typography>
                        {latestRefill.description && (
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Opis dopune:</strong> {latestRefill.description}
                            </Typography>
                        )}
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};
