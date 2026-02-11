import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, TextField, Button } from "@mui/material";
import http from "../../api/http";
import { API } from "../../api/endpoints";
import AppSnackbar from "../../components/AppSnackbar";

export default function OfficeEdit() {
  const { id } = useParams();
  const { state } = useLocation(); // office data
  const navigate = useNavigate();
  const [snack, setSnack] = useState(false);

  const [form, setForm] = useState({
    officeName: state?.officeName || "",
    adminName: state?.adminName || "",
    adminMobile: state?.adminMobile || "",
    logoUrl: state?.logoUrl || "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await http.put(API.UPDATE_OFFICE(id), form);
      setSnack(true);

      setTimeout(() => {
        navigate("/dashboard/superadmin/offices");
      }, 1200);
    } catch (err) {
      console.error("Office update failed", err);
    }
  };

  return (
    <Card className="max-w-3xl">
      <CardContent>
        <h2 className="mb-4 text-xl font-bold">Edit Office</h2>

        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <TextField
            name="officeName"
            label="Office Name"
            value={form.officeName}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            name="adminName"
            label="Admin Name"
            value={form.adminName}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            name="adminMobile"
            label="Admin Mobile"
            value={form.adminMobile}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            name="logoUrl"
            label="Logo URL"
            value={form.logoUrl}
            onChange={handleChange}
            fullWidth
          />

          <div className="flex col-span-2 gap-3">
            <Button type="submit" variant="contained">
              Update
            </Button>

            <Button variant="outlined" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>

      <AppSnackbar
        open={snack}
        onClose={() => setSnack(false)}
        message="Office updated successfully"
      />
    </Card>
  );
}
