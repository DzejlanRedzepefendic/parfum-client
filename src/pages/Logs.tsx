import React, { useState, useRef, useCallback } from 'react';
import { useGetAllAuditQuery } from '../api/queries/audit/useGetAllAuditQuery';
import { Avatar, Box, List, ListItem, Paper, Stack, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { PersonPinCircleOutlined } from '@mui/icons-material';
import { format } from 'date-fns';
import { useMarkAuditQuery } from '../api/queries/audit/useMarkAuditQuery';

const translateAction = (action: string): string => {
    const actionTranslations: { [key: string]: string } = {
        "article_created": "Kreiran artikal",
        "article_updated": "Ažuriran artikal",
        "article_deleted": "Obrisan artikal",
        "company_created": "Kreirana kompanija",
        "company_updated": "Ažurirana kompanija",
        "company_deleted": "Obrisana kompanija",
        "refill_created": "Kreirano punjenje",
        "user_created": "Kreiran korisnik",
        "user_updated": "Ažuriran korisnik",
        "user_deleted": "Obrisan korisnik"
    };

    return actionTranslations[action] || action;
};

export const Logs: React.FC = () => {
    const [sortBy, setSortBy] = useState('createdAt');
    const [order, setOrder] = useState('DESC');
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetAllAuditQuery({ order, sortBy });
    const { mutateAsync } = useMarkAuditQuery();

    const observer = useRef<IntersectionObserver | null>(null);
    const lastLogElementRef = useCallback((node: HTMLDivElement | null) => {
        if (isFetchingNextPage) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        });
        if (node) observer.current.observe(node);
    }, [isFetchingNextPage, fetchNextPage, hasNextPage]);

    const handleSortChange = (field: string, direction: string) => {
        setSortBy(field);
        setOrder(direction);
    };

    return (
        <Box p={2} sx={{ paddingBottom: '50px' }}>
            <Typography variant="h5" gutterBottom align="center">
                Logovi
            </Typography>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="sort-select-label">Sortiraj po</InputLabel>
                <Select
                    labelId="sort-select-label"
                    value={`${sortBy}-${order}`}
                    onChange={(event) => {
                        const [field, direction] = event.target.value.split('-');
                        handleSortChange(field, direction);
                    }}
                    label="Sortiraj po"
                >
                    <MenuItem value="createdAt-ASC">Kreirano rastuće</MenuItem>
                    <MenuItem value="createdAt-DESC">Kreirano opadajuće</MenuItem>
                    <MenuItem value="seen-ASC">Pregledano rastuće</MenuItem>
                    <MenuItem value="seen-DESC">Pregledano opadajuće</MenuItem>
                </Select>
            </FormControl>
            <List>
                {data?.pages.map((page, pageIndex) => (
                    <React.Fragment key={pageIndex}>
                        {page.data.map((log, logIndex) => {
                            const isLastElement = page.data.length === logIndex + 1;
                            return (
                                <Paper
                                    ref={isLastElement ? lastLogElementRef : null}
                                    onClick={async () => { if (!log.seen) { await mutateAsync(log._id); } }}
                                    key={log._id}
                                    elevation={3}
                                    sx={{
                                        marginBottom: 2,
                                        padding: 2,
                                        backgroundColor: log.seen ? '#E0E0E0' : '#E3F2FD',
                                        cursor: 'pointer',
                                        color: log.seen ? '#616161' : '#0D47A1'
                                    }}
                                >
                                    <ListItem alignItems="flex-start">
                                        <Avatar sx={{ marginRight: 2 }}>
                                            <PersonPinCircleOutlined />
                                        </Avatar>
                                        <Box sx={{ width: '100%' }}>
                                            <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: 1 }}>
                                                <Typography variant="body2">Akcija:</Typography>
                                                <Typography variant="body2">{translateAction(log?.action)}</Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: 1 }}>
                                                <Typography variant="body2">Izvršio:</Typography>
                                                <Typography variant="body2">{log?.executedByDetails?.username}</Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: 1 }}>
                                                <Typography variant="body2">Datum:</Typography>
                                                <Typography variant="body2">
                                                    {format(new Date(log?.createdAt), 'dd/MM/yyyy HH:mm:ss')}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: 1 }}>
                                                <Typography variant="body2">Korisničko ime:</Typography>
                                                <Typography variant="body2">{log?.executedByDetails?.username}</Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="body2">ID:</Typography>
                                                <Typography variant="body2">{log?.changes?.currentState?._id}</Typography>
                                            </Stack>
                                        </Box>
                                    </ListItem>
                                </Paper>
                            );
                        })}
                    </React.Fragment>
                ))}
                {isFetchingNextPage && <Typography align="center">Učitavanje...</Typography>}
            </List>
        </Box>
    );
};

export default Logs;
