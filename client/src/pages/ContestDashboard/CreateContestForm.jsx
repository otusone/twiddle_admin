import React from "react";
import {
  Box,
  Modal,
  TextField,
  Button,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";

export default function CreateContestForm({ open, onClose, formData, setFormData, handleSubmit }) {
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          maxWidth: 800,
          maxHeight: '90vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          p: 4,
          m: 'auto',
          mt: '3%',
          borderRadius: 3,
          boxShadow: 24,
          backdropFilter: 'blur(8px)',
          position: 'relative',
          
          
        }}
      >
        <Typography variant="h5" align="center" gutterBottom color="#7B49FF" fontWeight="bold" sx={{ mb: 4 }}>
          Create Contest
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <TextField label="Contest Name" name="name" variant="outlined" fullWidth onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
          <TextField label="Age Limit" name="ageLimit" type="number" variant="outlined" fullWidth onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
          <TextField
            select
            name="gender"
            label="Gender"
            fullWidth
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }} >
            <MenuItem value="photo">Male</MenuItem>
            <MenuItem value="video">Female</MenuItem>
            <MenuItem value="story">Other</MenuItem>
          </TextField>
          <TextField label="Location" name="location" variant="outlined" fullWidth onChange={handleInputChange} InputLabelProps={{ shrink: true }} />

          <TextField
            select
            name="type"
            label="Type"
            fullWidth
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value="photo">Photo</MenuItem>
            <MenuItem value="video">Video</MenuItem>
            <MenuItem value="story">Story</MenuItem>
            <MenuItem value="poll">Poll</MenuItem>
          </TextField>

          <TextField
            name="banner"
            type="file"
            variant="outlined"
            fullWidth
            inputProps={{ accept: "image/*" }}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField name="startDate" type="date" label="Start Date" fullWidth onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
          <TextField name="endDate" type="date" label="End Date" fullWidth onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
          <TextField
            label="Description"
            name="description"
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            multiline
            rows={3}
            sx={{ gridColumn: 'span 2' }}
          />



          <FormControlLabel
            control={
              <Checkbox
                checked={formData.enabled}
                onChange={handleInputChange}
                name="enabled"
                sx={{ color: '#FA457E' }}
              />
            }
            label="Enable Contest"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.allowComments}
                onChange={handleInputChange}
                name="allowComments"
                sx={{ color: '#FA457E' }}
              />
            }
            label="Allow Comments"
          />

          <Box gridColumn="span 2" textAlign="right" mt={1}>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#FA457E', ':hover': { bgcolor: '#d93a6d' } }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
