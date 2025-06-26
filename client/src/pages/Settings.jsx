import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Switch,
} from "@mui/material";

export default function Settings() {
  const [settings, setSettings] = useState({
    appName: "Twiddle",
    supportEmail: "support@gmail.com",
    minAge: 18,
    maxAge: 60,
    genderPreference: "All",
    enableLocationFilter: true,
    enableTwoFactorAuth: false,
    subscriptionCurrency: "USD",
  });

  const handleChange = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saved settings:", settings);
    alert("Settings saved successfully!");
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
        Admin Settings
      </Typography>

      <Grid container spacing={6}>
        {/* General Settings */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            General
          </Typography>
          <TextField
            fullWidth
            label="App Name"
            value={settings.appName}
            onChange={handleChange("appName")}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Support Email"
            value={settings.supportEmail}
            onChange={handleChange("supportEmail")}
            sx={{ mb: 2 }}
          />
        </Grid>

        {/* User Preferences */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            User Preferences
          </Typography>
          <TextField
            fullWidth
            type="number"
            label="Minimum Age"
            value={settings.minAge}
            onChange={handleChange("minAge")}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="number"
            label="Maximum Age"
            value={settings.maxAge}
            onChange={handleChange("maxAge")}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Gender Preference</InputLabel>
            <Select
              value={settings.genderPreference}
              onChange={handleChange("genderPreference")}
              label="Gender Preference"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Non-binary">Others</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Privacy & Security */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            Privacy & Security
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={settings.enableLocationFilter}
                onChange={handleChange("enableLocationFilter")}
              />
            }
            label="Enable Location Filter"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.enableTwoFactorAuth}
                onChange={handleChange("enableTwoFactorAuth")}
              />
            }
            label="Enable Two-Factor Authentication"
          />
          <br></br>

          <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ mt: 4 }}
          >
            Save Settings
          </Button>
        </Grid>
        </Grid>

        {/* Subscription */}
        {/* <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            Subscription
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Currency</InputLabel>
            <Select
              value={settings.subscriptionCurrency}
              onChange={handleChange("subscriptionCurrency")}
              label="Currency"
            >
              <MenuItem value="USD">USD ($)</MenuItem>
              <MenuItem value="INR">INR (₹)</MenuItem>
              <MenuItem value="EUR">EUR (€)</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}

        {/* Save Button */}
        {/* <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ mt: 3 }}
          >
            Save Settings
          </Button>
        </Grid> */}
      </Grid>
    </div>
  );
}
