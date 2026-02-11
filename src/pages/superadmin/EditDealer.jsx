import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, TextField, Button } from "@mui/material";
import http from "../../api/http";
import { API } from "../../api/endpoints";
import AppSnackbar from "../../components/AppSnackbar";

export default function EditDealer() {
  const { id } = useParams();
  const { state } = useLocation(); // dealer data
  const navigate = useNavigate();
  const [snack, setSnack] = useState(false);

  const [form, setForm] = useState({
    dealerName: state?.dealerName || "",
    email: state?.email || "",
    address: state?.address || "",
    panVatNumber: state?.panVatNumber || "",
    mobileNumber: state?.mobileNumber || "",
    remarks: state?.remarks || "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await http.put(API.UPDATE_DEALER(id), form);
    setSnack(true);
    setTimeout(() => {
      navigate("/dashboard/superadmin/dealers");
    }, 1200);
  };

  return (
    <Card className="max-w-3xl">
      <CardContent>
        <h2 className="mb-4 text-xl font-bold">Edit Dealer</h2>

        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <TextField
            name="dealerName"
            label="Dealer Name"
            value={form.dealerName}
            onChange={handleChange}
          />
          <TextField
            name="mobileNumber"
            label="Mobile"
            value={form.mobileNumber}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            name="panVatNumber"
            label="PAN / VAT"
            value={form.panVatNumber}
            onChange={handleChange}
          />
          <TextField
            name="address"
            label="Address"
            value={form.address}
            onChange={handleChange}
          />
          <TextField
            name="remarks"
            label="Remarks"
            value={form.remarks}
            onChange={handleChange}
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
        message="डिलर अपडेट सफलतापूर्वक भयो"
      />
    </Card>
  );
}
