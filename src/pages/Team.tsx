import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Avatar,
  IconButton,
  Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRegisterQuery } from '../api/queries/auth/useRegisterQuery';
import { useGetAllUsers } from '../api/queries/user/useGetAllUsers';
import { useUpdateUser } from '../api/queries/user/useUpdateUser';
import { PullUser } from '../interfaces/user.interface';
import { toast } from 'react-toastify';

interface User {
  username: string;
  password: string;
  _id:string;
}

export const Team: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<PullUser | null>(null);
  const [newUser, setNewUser] = useState<User>({ username: '', password: '', _id:''});
  const {mutateAsync} = useRegisterQuery();
  const {data} = useGetAllUsers()
  const {mutateAsync:mutateAsyncUpdateUser} = useUpdateUser()



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddUser = async () => {
    setUsers([...users, newUser]);
    await mutateAsync(newUser,{
      onSuccess:()=>{
        handleClose();
        toast.success('Korisnik uspješno dodan');
      }
    
    });
    setNewUser({ username: '', password: '' ,_id:''});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleEditClick = async (user: PullUser) => {
    setSelectedUser(user);
    setNewUser(user);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedUser(null);
    setNewUser({ username: '', password: '',_id:''});
  };

  const handleEditUser = async () => {
    await mutateAsyncUpdateUser(newUser,{
      onSuccess:()=>{
        handleEditClose();
        toast.success('Korisnik uspješno izmjenjen');
      }
    
    });
    // setUsers(users.map((user) => (user.username === selectedUser?.username ? newUser : user)));
  };

  const handleDeleteClick = (user: PullUser) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    setUsers(users.filter((user) => user.username !== selectedUser?.username));
    handleDeleteClose();
  };

  return (
    <Box p={2} sx={{paddingBottom:'50px'}}>
    <Box sx={{ paddingBottom: '12px'}} display="flex" justifyContent="center" alignItems="center" mb={2}>
  <Button
    variant="contained"
    color="primary"
    onClick={handleClickOpen}
    startIcon={<AddIcon />}
    sx={{ width: '100%', '&:hover': { backgroundColor: '#45A049' } }}
  >
    Dodaj korisnika u tim
  </Button>
</Box>
      <List>
        {data?.map((user, index) => (
          <Paper key={index} elevation={3} sx={{ marginBottom: 2, padding: 2 }}>
            <ListItem>
              <Avatar sx={{ marginRight: 2 }}>
                <PersonIcon />
              </Avatar>
              <ListItemText primary={user.username} />
              <Stack direction="row" spacing={1}>
                <IconButton color="primary" onClick={() => handleEditClick(user)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDeleteClick(user)}>
                  <DeleteIcon color='error' />
                </IconButton>
              </Stack>
            </ListItem>
          </Paper>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Dodaj novog korisnika u timu</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Korisničko ime"
            type="text"
            fullWidth
            value={newUser.username}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Lozinka"
            type="password"
            fullWidth
            value={newUser.password}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Odustani
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Izmeni korisnika</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Korisničko ime"
            type="text"
            fullWidth
            value={newUser.username}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Lozinka"
            type="password"
            fullWidth
            value={newUser.password}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Odustani
          </Button>
          <Button onClick={()=>handleEditUser()} color="primary">
            Sačuvaj
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle>Potvrdi brisanje</DialogTitle>
        <DialogContent>
          <Typography>Da li si siguran da zelis obrisati {selectedUser?.username}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Odustani
          </Button>
          <Button onClick={handleDeleteUser} color="secondary">
            Obriši
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Team;
