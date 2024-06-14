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

  console.log(data,"data");

  console.log(newUser,"newUser");

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
        toast.success('User added successfully');
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
        toast.success('User updated successfully');
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
    Add Team Member
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
        <DialogTitle>Add New Team Member</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Username"
            type="text"
            fullWidth
            value={newUser.username}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={newUser.password}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Team Member</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Username"
            type="text"
            fullWidth
            value={newUser.username}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={newUser.password}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>handleEditUser()} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete {selectedUser?.username}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Team;
