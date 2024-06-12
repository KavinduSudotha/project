import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  IconButton,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const ProfileDialog = ({ open, handleClose, userId }) => {
  const [userDetails, setUserDetails] = useState({});
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    // Fetch user details using userId
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/home/userprofile/${userId}`);
        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const handlePasswordChange = async () => {
    // Password validation logic
    if (newPassword.length < 8 || newPassword.length > 15 || !/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      setPasswordError('Password must be 8-15 characters and include at least one uppercase letter, one lowercase letter, and one number.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/home/userprofile/${userId}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (response.ok) {
        setChangePasswordOpen(false);
      } else {
        const data = await response.json();
        setPasswordError(data.error);
      }
    } catch (error) {
      console.error('Failed to change password:', error);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Profile Details</DialogTitle>
        <DialogContent>
          <Card variant="outlined" sx={{ mb: 2, p: 2, boxShadow: 3 }}>
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText primary="Username" secondary={userDetails.username || ''} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="First Name" secondary={userDetails.firstname || ''} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Last Name" secondary={userDetails.lastname || ''} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Address" secondary={userDetails.address || ''} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Email" secondary={userDetails.email || ''} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Mobile Number" secondary={userDetails.mobilenumber || ''} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button onClick={handleClose} color="primary">Close</Button>
            <IconButton color="primary" onClick={() => setChangePasswordOpen(true)}>
              <LockIcon />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={changePasswordOpen} onClose={() => setChangePasswordOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          {passwordError && (
            <Typography color="error" variant="body2">
              {passwordError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setChangePasswordOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handlePasswordChange} color="primary">Change Password</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileDialog;
