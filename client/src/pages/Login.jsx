import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Paper
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError(''); 

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (email === 'admin@otusone.com' && password === 'admin@otusone') {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to top right, #FA457E, #7B49FF)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2
      }}
    >
      <Paper elevation={6} sx={{ maxWidth: 400, width: '100%', p: 4, borderRadius: 3 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          fontWeight="bold"
          sx={{
            background: 'linear-gradient(to right, #FA457E, #7B49FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Admin Login
        </Typography>

        {error && (
          <Typography color="error" align="center" mb={2}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="email"
            required
          />

          <TextField
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              background: 'linear-gradient(to right, #FA457E, #7B49FF)',
              color: '#fff',
              fontWeight: 'bold',
              '&:hover': {
                background: 'linear-gradient(to right, #FA457E, #7B49FF)',
                opacity: 0.9
              }
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
