// components/NotificationCard.tsx

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import {NotificationData} from "../api/request/refill.ts";

interface NotificationCardProps {
    notification: NotificationData;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="body2"><strong>Datum isteka:</strong> {new Date(notification.expiresAt).toLocaleDateString()}</Typography>
                <Typography variant="body2"><strong>Preostalo vreme:</strong> {notification.formattedRemainingTime}</Typography>
                <Typography variant="body2"><strong>Kompanija:</strong> {notification.companyDetails.map(company => company.name).join(', ')}</Typography>
                <Typography variant="body2"><strong>Artikli:</strong> {notification.articleDetails.map(article => article.name).join(', ')}</Typography>
                <Typography variant="body2"><strong>Popunjeno od:</strong> {notification.filledByDetails.map(filledBy => filledBy.username).join(', ')}</Typography>
            </CardContent>
        </Card>
    );
};

export default NotificationCard;
