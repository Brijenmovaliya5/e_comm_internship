// UpdateItemDialog.js
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const UpdateItemDialog = ({ open, handleClose, handleSubmit, item, handleChange }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update Item</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please update the details of the item.
                </DialogContentText>
                
                
                <TextField
                    margin="dense"
                    id="price"
                    name="price"
                    label="Price"
                    type="number"
                    fullWidth
                    value={item.price}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    id="stocks"
                    name="stocks"
                    label="Stocks"
                    type="number"
                    fullWidth
                    value={item.stocks}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Update Item
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateItemDialog;
