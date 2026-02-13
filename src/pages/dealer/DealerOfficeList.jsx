import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import http from "../../api/http";
import { API } from "../../api/endpoints";
import LockResetIcon from "@mui/icons-material/LockReset";

export default function DealerOfficeList() {
  const [offices, setOffices] = useState([]);
  const [openReset, setOpenReset] = useState(false);
  const [selectedOfficeId, setSelectedOfficeId] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetError, setResetError] = useState("");


  useEffect(() => {
    loadOffices();
  }, []);

    const loadOffices = async () => {
          try {
            const res = await http.get(API.DEALER_OFFICES);

            const list = Array.isArray(res.data)
              ? res.data
              : res.data?.data || res.data?.offices || [];

            setOffices(list);
          } catch (err) {
            console.error("Failed to load dealer offices", err);
          }
        };

    const handleResetPassword = async (officeId) => {
          try {
            await http.post(API.RESET_OFFICE_PASSWORD(officeId));

            alert("Password reset successfully");
          } catch (error) {
            console.error("Failed to reset password", error);
            alert("Failed to reset password");
          }
        };

        const handleResetSubmit = async () => {
      if (!newPassword || !confirmPassword) {
        setResetError("All fields are required");
        return;
      }

      if (newPassword.length < 6) {
        setResetError("Password must be at least 6 characters");
        return;
      }

      if (newPassword !== confirmPassword) {
        setResetError("Passwords do not match");
        return;
      }

      try {
        await http.post(API.RESET_OFFICE_PASSWORD(selectedOfficeId), {
          password: newPassword,
        });

        setOpenReset(false);
        setNewPassword("");
        setConfirmPassword("");
        setResetError("");

        alert("Password reset successfully");
      } catch (error) {
        setResetError("Failed to reset password");
      }
    };


  return (
      <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Office</TableCell>
                  <TableCell>Admin Name</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Dealer</TableCell>
                  <TableCell>Ward</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Expire Date</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {offices.map((o, index) => (
                    <TableRow key={o.Id || index}>
                        <TableCell>{o.adminName}</TableCell>
                      <TableCell>{o.OfficeNameEng}</TableCell>
                      <TableCell>{o.OfficeAdminName}</TableCell>
                      <TableCell>{o.AdminMobile}</TableCell>
                      <TableCell>{o.WardNumber}</TableCell>
                      <TableCell>{o.ContactEmail}</TableCell>
                      <TableCell>{o.DealerName || "You"}</TableCell>


                    <TableCell>
                      {o.IsApproved ? (
                        <Chip label="Approved" color="success" size="small" />
                      ) : (
                        <Chip label="Pending" color="warning" size="small" />
                      )}
                    </TableCell>

                    <TableCell>
                      {o.expireDate
                        ? o.expireDate.substring(0, 10)
                        : "-"}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Reset Password">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => {setSelectedOfficeId(o.Id);setOpenReset(true);}}
                        >
                          <LockResetIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>


          <Dialog open={openReset} onClose={() => setOpenReset(false)} maxWidth="xs" fullWidth>
          <DialogTitle>Reset Password</DialogTitle>

          <DialogContent>
            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {resetError && (
              <Typography color="error" variant="body2">
                {resetError}
              </Typography>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpenReset(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleResetSubmit}>
              Reset
            </Button>
          </DialogActions>
        </Dialog>
    </>
  );
}
