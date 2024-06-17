import React, { useState } from 'react';
import { useGetAllAuditQuery } from '../api/queries/audit/useGetAllAuditQuery';
import { Avatar, Box, List, ListItem, Paper, Stack, Typography, Button, ButtonGroup, ToggleButtonGroup, ToggleButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { PersonPinCircleOutlined } from '@mui/icons-material';
import { format } from 'date-fns';
import { useMarkAuditQuery } from '../api/queries/audit/useMarkAuditQuery';

export const Logs: React.FC = () => {
  const [sortBy, setSortBy] = useState('seen');
  const [order, setOrder] = useState('ASC');
  const { data } = useGetAllAuditQuery({order,sortBy});
  const { mutateAsync } = useMarkAuditQuery();

  const handleSortChange = (field: string, direction: string) => {
    setSortBy(field);
    setOrder(direction);
  };

  return (
    <Box p={2} sx={{ paddingBottom: '50px' }}>
      <Typography variant="h5" gutterBottom align="center">
        Audit Logs
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
  <InputLabel id="sort-select-label">Sort By</InputLabel>
  <Select
    labelId="sort-select-label"
    value={`${sortBy}-${order}`}
    onChange={(event) => {
      const [field, direction] = event.target.value.split('-');
      handleSortChange(field, direction);
    }}
    label="Sort By"
  >
    <MenuItem value="createdAt-ASC">Created At Ascending</MenuItem>
    <MenuItem value="createdAt-DESC">Created At Descending</MenuItem>
    <MenuItem value="seen-ASC">Seen Ascending</MenuItem>
    <MenuItem value="seen-DESC">Seen Descending</MenuItem>
  </Select>
</FormControl>
      <List>
        {data?.data?.map((log, index: number) => (
          <Paper
            onClick={async () => {if(!log.seen){ await mutateAsync(log._id); }}}
            key={index}
            elevation={3}
            sx={{
              marginBottom: 2,
              padding: 2,
              backgroundColor: log.seen ? '#f0f0f0' : '#e0ffe0',
              cursor: 'pointer'
            }}
          >
            <ListItem alignItems="flex-start">
              <Avatar sx={{ marginRight: 2 }}>
                <PersonPinCircleOutlined />
              </Avatar>
              <Box sx={{ width: '100%' }}>
                <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: 1 }}>
                  <Typography variant="body2" color="text.secondary">Action:</Typography>
                  <Typography variant="body2" color="text.primary">{log?.action}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: 1 }}>
                  <Typography variant="body2" color="text.secondary">Executed By:</Typography>
                  <Typography variant="body2" color="text.primary">{log?.executedByDetails?.username}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: 1 }}>
                  <Typography variant="body2" color="text.secondary">Date:</Typography>
                  <Typography variant="body2" color="text.primary">
                    {format(new Date(log?.createdAt), 'dd/MM/yyyy HH:mm:ss')}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: 1 }}>
                  <Typography variant="body2" color="text.secondary">Username:</Typography>
                  <Typography variant="body2" color="text.primary">{log?.changes?.currentState?.username}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: 1 }}>
                  <Typography variant="body2" color="text.secondary">Role:</Typography>
                  <Typography variant="body2" color="text.primary">{log?.changes.currentState?.role}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">ID:</Typography>
                  <Typography variant="body2" color="text.primary">{log?.changes?.currentState?._id}</Typography>
                </Stack>
              </Box>
            </ListItem>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default Logs;
