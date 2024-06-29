import React, { useState } from 'react';
import { Box, Typography, TextField, Switch, Button, CircularProgress, IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import {useAuth} from "../context/AuthContext.tsx";



const Profile: React.FC = () => {
    const user = useAuth().user;
    const [phoneNumbers, setPhoneNumbers] = useState<string[]>(user?.notifications?.phoneNumbers || []);
    const [newPhoneNumber, setNewPhoneNumber] = useState<string>('');
    const [notificationIntervalDays, setNotificationIntervalDays] = useState<number[]>(user?.notifications?.notificationIntervalDays || []);
    const [newNotificationIntervalDay, setNewNotificationIntervalDay] = useState<number>(0);
    const [subscription, setSubscription] = useState(user?.notifications?.subscription || false);
    const [hours, setHours] = useState(user?.notificationTime?.hours || 0);
    const [meridiem, setMeridiem] = useState(user?.notificationTime?.meridiem || 'AM');
    const [updating, setUpdating] = useState(false);

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

    const handleSave = async () => {
        try {
            setUpdating(true);
            const updatedUserData = {
                ...user,
                notifications: {
                    ...user?.notifications,
                    phoneNumbers,
                    notificationIntervalDays,
                    subscription,
                },
                notificationTime: {
                    hours: Number(hours),
                    meridiem,
                }
            };
            console.log(updatedUserData)
            // Replace useUpdateUserProfileMutation with your actual update mutation hook
            // await useUpdateUserProfileMutation(updatedUserData);
            toast.success('Profil je uspešno ažuriran.');
        } catch (error) {
            toast.error('Došlo je do greške prilikom ažuriranja profila.');
        } finally {
            setUpdating(false);
        }
    };

    return (
        <Box p={2} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4" gutterBottom>Korisnički profil</Typography>
            <Box width="100%" maxWidth={400} mb={2}>
                {phoneNumbers.map((phoneNumber, index) => (
                    <Typography key={index}>{phoneNumber}</Typography>
                ))}
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
                {notificationIntervalDays.map((day, index) => (
                    <Typography key={index}>{day} dana</Typography>
                ))}
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
                        checked={subscription}
                        onChange={(e) => setSubscription(e.target.checked)}
                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                    />
                </Box>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Sati obaveštenja</InputLabel>
                    <Select
                        value={hours}
                        onChange={(e) => setHours(Number(e.target.value))}
                    >
                        {[...Array(12)].map((_, i) => (
                            <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>AM/PM</InputLabel>
                    <Select
                        value={meridiem}
                        onChange={(e) => setMeridiem(e.target.value)}
                    >
                        <MenuItem value="AM">AM</MenuItem>
                        <MenuItem value="PM">PM</MenuItem>
                    </Select>
                </FormControl>
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
