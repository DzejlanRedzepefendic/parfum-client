import React from 'react';
import { Card, CardContent, CardHeader, Typography, Divider } from '@mui/material';
import { Company as CompanyType } from '../interfaces/company.interface';

interface CompanyDetailsContentProps {
    company: CompanyType;
}

const CompanyDetailsContent: React.FC<CompanyDetailsContentProps> = ({ company }) => {
    return (
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
    );
};

export default CompanyDetailsContent;
