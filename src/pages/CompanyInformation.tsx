import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useChangeCompanyInformation } from '../api/queries/company/useChangeCompanyInformation.ts';

interface Company {
    _id: string;
    name: string;
    description: string;
    companyDescriptions: string[];
    devices: string[];
}

function CompanyInformation() {
    const navigate = useNavigate();
    const location = useLocation();
    const company: Company = location.state;

    useEffect(() => {
        if (!company) {
            navigate('/company');
        }
    }, [company, navigate]);

    const { mutateAsync } = useChangeCompanyInformation();
    const [companyDescriptions, setCompanyDescriptions] = useState(company?.companyDescriptions || []);
    const [devices, setDevices] = useState(company?.devices || []);
    const [newCompanyDescription, setNewCompanyDescription] = useState('');
    const [newDevice, setNewDevice] = useState('');

    if (!company) {
        return null;
    }

    const handleAddDescription = () => {
        if (newCompanyDescription.trim()) {
            setCompanyDescriptions([...companyDescriptions, newCompanyDescription.trim()]);
            setNewCompanyDescription('');
        }
    };

    const handleAddDevice = () => {
        if (newDevice.trim()) {
            setDevices([...devices, newDevice.trim()]);
            setNewDevice('');
        }
    };

    const handleRemoveDescription = (index: number) => {
        const updatedDescriptions = [...companyDescriptions];
        updatedDescriptions.splice(index, 1);
        setCompanyDescriptions(updatedDescriptions);
    };

    const handleRemoveDevice = (index: number) => {
        const updatedDevices = [...devices];
        updatedDevices.splice(index, 1);
        setDevices(updatedDevices);
    };

    const handleSave = async () => {
        await mutateAsync({
            id: company._id,
            companyDescriptions,
            devices,
        });
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6">{company.name}</Typography>
            <Typography variant="body1" gutterBottom>{company.description}</Typography>
            <Typography variant="h6">Opis kompanije (placanje)</Typography>
            <List>
                {companyDescriptions.map((desc, index) => (
                    <ListItem
                        key={index}
                        secondaryAction={
                            <IconButton edge="end" onClick={() => handleRemoveDescription(index)}>
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText primary={desc} />
                    </ListItem>
                ))}
            </List>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextField
                    label="Dodaj novi opis"
                    value={newCompanyDescription}
                    onChange={(e) => setNewCompanyDescription(e.target.value)}
                    fullWidth
                />
                <IconButton color="primary" onClick={handleAddDescription}>
                    <AddIcon />
                </IconButton>
            </Box>
            <Typography variant="h6">Uređaji</Typography>
            <List>
                {devices.map((device, index) => (
                    <ListItem
                        key={index}
                        secondaryAction={
                            <IconButton edge="end" onClick={() => handleRemoveDevice(index)}>
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText primary={device} />
                    </ListItem>
                ))}
            </List>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextField
                    label="Dodaj novi uređaj"
                    value={newDevice}
                    onChange={(e) => setNewDevice(e.target.value)}
                    fullWidth
                />
                <IconButton color="primary" onClick={handleAddDevice}>
                    <AddIcon />
                </IconButton>
            </Box>
            <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
                Sačuvaj
            </Button>
            <Button sx={{marginTop:'10px'}} variant="contained" color="secondary" onClick={() => navigate('/company')} fullWidth>
                Nazad
            </Button>
        </Box>
    );
}

export default CompanyInformation;
