import React from 'react';
import { Card, CardContent, CardHeader, Typography, Avatar, Box, IconButton } from '@mui/material';
import { Company as CompanyType } from '../interfaces/company.interface';
import BusinessIcon from '@mui/icons-material/Business';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

interface CompanyCardProps {
  company: CompanyType;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/company/${company._id}`);
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#4CAF50' }}>
            <BusinessIcon />
          </Avatar>
        }
        action={
          <IconButton onClick={handleDetailsClick}>
            <ArrowForwardIcon />
          </IconButton>
        }
        title={company.name}
        subheader={company.address ? `${company.address.city}, ${company.address.country}` : 'No address provided'}
      />
      <CardContent>
        {company.address && (
          <Typography variant="body2" color="textSecondary">
            {company.address.street}, {company.address.city}, {company.address.state}, {company.address.zipCode}, {company.address.country}
          </Typography>
        )}
        <Box mt={1}>
          {company.contact && (
            <Typography variant="body2" color="textSecondary">
              <strong>Phone:</strong> {company.contact.phone}
            </Typography>
          )}
          {company.contact && (
            <Typography variant="body2" color="textSecondary">
              <strong>Email:</strong> {company.contact.email}
            </Typography>
          )}
        </Box>
        {company.description && (
          <Box mt={1}>
            <Typography variant="body2" color="textSecondary">
              <strong>Description:</strong> {company.description}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
