import React, { useState } from 'react';
import { Box, TextField, InputAdornment, Typography, Button, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useGetParfumNotification } from '../api/queries/refill/useGetParfumNotification';
import NotificationCard from '../components/NotificationCard';
import { NotificationData } from '../api/request/refill';

export const Home: React.FC = () => {
    const [days, setDays] = useState(7);

    const { data } = useGetParfumNotification({
        days,
        page: 1,
        limit: 9999,
    });

    const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDays(Number(e.target.value));
    };

    const handleDaysButtonClick = (selectedDays: number) => {
        setDays(selectedDays);
    };



    return (
        <Box p={2} paddingBottom={'50px'}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Notifikacije</Typography>
            <Box mb={2}>
                <Grid container spacing={2} mb={2}>
                    <Grid item>
                        <Button variant={days === 3 ? 'contained' : 'outlined'} onClick={() => handleDaysButtonClick(3)}>3 Days</Button>
                    </Grid>
                    <Grid item>
                        <Button variant={days === 7 ? 'contained' : 'outlined'} onClick={() => handleDaysButtonClick(7)}>7 Days</Button>
                    </Grid>
                    <Grid item>
                        <Button variant={days === 15 ? 'contained' : 'outlined'} onClick={() => handleDaysButtonClick(15)}>15 Days</Button>
                    </Grid>
                </Grid>
                <TextField
                    fullWidth
                    placeholder="Broj dana za pretragu..."
                    variant="outlined"
                    type="number"
                    value={days || ''}
                    onChange={handleDaysChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            {data?.data?.map((notification: NotificationData, index: number) => (
                <NotificationCard key={index} notification={notification} />
            ))}
        </Box>
    );
};

export default Home;
