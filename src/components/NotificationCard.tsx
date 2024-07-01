// components/NotificationCard.tsx

import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { NotificationData } from '../api/request/refill.ts';

interface NotificationCardProps {
    notification: NotificationData;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
    return (
        <Card sx={{ mb: 2, padding: 2, boxShadow: 3 }}>
            <CardContent>
                <Box mb={2}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        {notification.companyDetails.map(company => company.name).join(', ')}
                    </Typography>
                </Box>
                <Box mb={1}>
                    <Typography variant="body2"><strong>Datum isteka:</strong> {new Date(notification.expiresAt).toLocaleDateString()}</Typography>
                </Box>
                <Box mb={1}>
                    <Typography variant="body2"><strong>Preostalo vreme:</strong> {notification.formattedRemainingTime}</Typography>
                </Box>
                <Box mb={1}>
                    <Typography variant="body2"><strong>Artikli:</strong> {notification.articleDetails.map(article => article.name).join(', ')}</Typography>
                </Box>
                <Box mb={1}>
                    <Typography variant="body2"><strong>Popunjeno od:</strong> {notification.filledByDetails.map(filledBy => filledBy.username).join(', ')}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default NotificationCard;
