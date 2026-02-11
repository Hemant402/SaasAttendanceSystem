import { useState } from "react";
import { Card, CardContent, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import http from "../../api/http";
import { API } from "../../api/endpoints";
import AppSnackbar from "../../components/AppSnackbar";

export default function CreateDealer() {
  const navigate = useNavigate();
  const [snack, setSnack] = useState(false);

  const [form, setForm] = useState({
    dealerName: "",
    email: "",
    address: "",
    panVatNumber: "",
    mobileNumber: "",
    remarks: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await http.post(API.CREATE_DEALER, form);
    if (res.data) {
      setSnack(true);
      setTimeout(() => {
        navigate("/dashboard/superadmin/dealers");
      }, 1200);
    }
  };

  return (
    <Card className="max-w-3xl">
      <CardContent>
        <h2 className="mb-4 text-xl font-bold">Create Dealer</h2>

        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <TextField
            name="dealerName"
            label="Dealer Name"
            required
            onChange={handleChange}
          />
          <TextField
            name="mobileNumber"
            label="Mobile"
            required
            onChange={handleChange}
          />
          <TextField name="email" label="Email" onChange={handleChange} />
          <TextField
            name="panVatNumber"
            label="PAN / VAT"
            onChange={handleChange}
          />
          <TextField name="address" label="Address" onChange={handleChange} />
          <TextField name="remarks" label="Remarks" onChange={handleChange} />

          <div className="flex col-span-2 gap-3">
            <Button type="submit" variant="contained">
              Save
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
        message="डिलर सिर्जना सफलतापूर्वक सम्पन्न भयो"
      />
    </Card>
  );
}
