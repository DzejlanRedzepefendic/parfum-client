import React, { useState } from 'react';
import { Box, Typography, TextField, Switch, Button, CircularProgress, IconButton, MenuItem, Select, FormControl, InputLabel, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useAuth } from "../context/AuthContext.tsx";
import { useUpdateUser } from "../api/queries/user/useUpdateUser.ts";

const Profile: React.FC = () => {
    const user = useAuth().user;
    const [phoneNumbers, setPhoneNumbers] = useState<string[]>(user?.notifications?.phoneNumbers || []);
    const [newPhoneNumber, setNewPhoneNumber] = useState<string>('');
    const [notificationIntervalDays, setNotificationIntervalDays] = useState<number[]>(user?.notifications?.notificationIntervalDays || []);
    const [newNotificationIntervalDay, setNewNotificationIntervalDay] = useState<number>(0);
    const [subscribed, setSubscribed] = useState(user?.notifications?.subscribed || false);
    const [hours, setHours] = useState(user?.notifications?.notificationTime.hours || 0);
    const [meridiem, setMeridiem] = useState(user?.notifications?.notificationTime.meridiem || 'AM');
    const [updating, setUpdating] = useState(false);

    const { mutateAsync } = useUpdateUser();

    const handleAddPhoneNumber = () => {
        if (newPhoneNumber.trim()) {
            setPhoneNumbers([...phoneNumbers, newPhoneNumber.trim()]);
            setNewPhoneNumber('');
        }
    };

    const handleAddNotificationIntervalDay = () => {
        if (newNotificationIntervalDay > 0) {
            setNotificationIntervalDays([...notificationIntervalDays, newNotificationIntervalDay]);
            setNewNotificationIntervalDay(0);
        }
    };

    const handleRemovePhoneNumber = (index: number) => {
        const updatedPhoneNumbers = phoneNumbers.filter((_, i) => i !== index);
        setPhoneNumbers(updatedPhoneNumbers);
    };

    const handleRemoveNotificationIntervalDay = (index: number) => {
        const updatedNotificationIntervalDays = notificationIntervalDays.filter((_, i) => i !== index);
        setNotificationIntervalDays(updatedNotificationIntervalDays);
    };

    const handleSave = async () => {
        try {
            setUpdating(true);
            const updatedUserData = {
                ...user,
                notifications: {
                    ...user?.notifications,
                    phoneNumbers,
                    notificationIntervalDays,
                    subscribed,
                    notificationTime: {
                        hours: Number(hours),
                        meridiem,
                    }
                }
            };
            await mutateAsync({ ...updatedUserData, _id: user!.id });
            toast.success('Profil je uspešno ažuriran.');
        } catch (error) {
            toast.error('Došlo je do greške prilikom ažuriranja profila.');
        } finally {
            setUpdating(false);
        }
    };

    return (
        <Box p={2} display="flex" flexDirection="column" alignItems="center" paddingBottom={10}>
            <Typography variant="h4" gutterBottom>Korisnički profil</Typography>
            <Box width="100%" maxWidth={400} mb={2}>
                <Typography variant="h6" gutterBottom>Brojevi telefona</Typography>
                <List>
                    {phoneNumbers.map((phoneNumber, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={phoneNumber} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleRemovePhoneNumber(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
                <Box display="flex" alignItems="center" mb={2}>
                    <TextField
                        label="Novi broj telefona"
                        fullWidth
                        value={newPhoneNumber || ''}
                        onChange={(e) => setNewPhoneNumber(e.target.value)}
                    />
                    <IconButton color="primary" onClick={handleAddPhoneNumber}>
                        <AddIcon />
                    </IconButton>
                </Box>

                <Typography variant="h6" gutterBottom>Intervali obaveštenja</Typography>
                <List>
                    {notificationIntervalDays.map((day, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={`${day} dana`} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveNotificationIntervalDay(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
                <Box display="flex" alignItems="center" mb={2}>
                    <TextField
                        label="Novi interval obaveštenja (dani)"
                        fullWidth
                        type="number"
                        value={newNotificationIntervalDay || ''}
                        onChange={(e) => setNewNotificationIntervalDay(Number(e.target.value))}
                    />
                    <IconButton color="primary" onClick={handleAddNotificationIntervalDay}>
                        <AddIcon />
                    </IconButton>
                </Box>

                <Box display="flex" alignItems="center" mb={2}>
                    <Typography variant="body1" sx={{ mr: 2 }}>Pretplata na notifikacije</Typography>
                    <Switch
                        checked={subscribed}
                        onChange={(e) => setSubscribed(e.target.checked)}
                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                    />
                </Box>

                <Box display="flex" justifyContent="space-between" mb={2}>
                    <FormControl variant="outlined" fullWidth sx={{ mr: 1 }}>
                        <InputLabel>Sati obaveštenja</InputLabel>
                        <Select
                            value={hours}
                            onChange={(e) => setHours(Number(e.target.value))}
                            label="Sati obaveštenja"
                        >
                            {[...Array(12)].map((_, i) => (
                                <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" fullWidth sx={{ ml: 1 }}>
                        <InputLabel>AM/PM</InputLabel>
                        <Select
                            value={meridiem}
                            onChange={(e) => setMeridiem(e.target.value)}
                            label="AM/PM"
                        >
                            <MenuItem value="AM">AM</MenuItem>
                            <MenuItem value="PM">PM</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    disabled={updating}
                    onClick={handleSave}
                >
                    {updating ? <CircularProgress size={24} /> : 'Sačuvaj promene'}
                </Button>
            </Box>
        </Box>
    );
};

export default Profile;
