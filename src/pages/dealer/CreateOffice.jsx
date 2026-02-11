import { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import http from "../../api/http";
import { API } from "../../api/endpoints";
import AppSnackbar from "../../components/AppSnackbar";

export default function CreateOffice() {
  const [form, setForm] = useState({
    officeName: "",
    adminName: "",
    adminMobile: "",
    password: "",
    logoFile: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const newErrors = {};

    if (!form.officeName.trim())
      newErrors.officeName = "Office name is required";

    if (!form.adminName.trim())
      newErrors.adminName = "Admin name is required";

    if (!form.adminMobile.trim())
      newErrors.adminMobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(form.adminMobile))
      newErrors.adminMobile = "Enter valid 10-digit mobile number";

    if (!form.password)
      newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!form.logoFile)
      newErrors.logoFile = "Office logo is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- HANDLERS ----------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, logoFile: e.target.files[0] });
    setErrors({ ...errors, logoFile: "" });
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("officeName", form.officeName);
      payload.append("adminName", form.adminName);
      payload.append("adminMobile", form.adminMobile);
      payload.append("password", form.password);
      payload.append("logo", form.logoFile);

      await http.post(API.CREATE_OFFICE, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSnack({
        open: true,
        message: "Office सफलतापूर्वक सिर्जना भयो",
        severity: "success",
      });

      setForm({
        officeName: "",
        adminName: "",
        adminMobile: "",
        password: "",
        logoFile: null,
      });
    } catch (err) {
      setSnack({
        open: true,
        message: "Office सिर्जना गर्न असफल भयो",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <Box className="mx-auto max-w-xl">
      <Card elevation={3}>
        <CardContent className="space-y-5">
          <Typography variant="h6" fontWeight={600}>
            Create New Office
          </Typography>

          <TextField
            label="Office Name"
            name="officeName"
            fullWidth
            value={form.officeName}
            onChange={handleChange}
            error={!!errors.officeName}
            helperText={errors.officeName}
          />

          <TextField
            label="Admin Name"
            name="adminName"
            fullWidth
            value={form.adminName}
            onChange={handleChange}
            error={!!errors.adminName}
            helperText={errors.adminName}
          />

          <TextField
            label="Admin Mobile"
            name="adminMobile"
            fullWidth
            value={form.adminMobile}
            onChange={handleChange}
            error={!!errors.adminMobile}
            helperText={errors.adminMobile}
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          {/* LOGO FILE UPLOAD */}
          <Box>
            <Button variant="outlined" component="label" fullWidth>
              Upload Office Logo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            {form.logoFile && (
              <Typography variant="caption" className="block mt-1">
                Selected: {form.logoFile.name}
              </Typography>
            )}
            {errors.logoFile && (
              <Typography color="error" variant="caption">
                {errors.logoFile}
              </Typography>
            )}
          </Box>

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Office"}
          </Button>
        </CardContent>
      </Card>

      <AppSnackbar
        {...snack}
        onClose={() => setSnack({ ...snack, open: false })}
      />
    </Box>
  );
}
