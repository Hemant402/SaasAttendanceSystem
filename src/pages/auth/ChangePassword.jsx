import { Box, Typography, TextField, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import attendanceimg from "../../assets/attendanceimgs.webp";

export default function ChangePassword() {
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* LEFT SIDE (Same as Login Page) */}
      <div className="flex items-center justify-center w-1/2 bg-gray-100">
        <img
          src={attendanceimg}
          alt="Attendance"
          className="w-2/3"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col items-center justify-center w-1/2 px-10">
        <Box className="w-full max-w-md">
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            Change Password ?
          </Typography>

          {/* New Password */}
          <TextField
            fullWidth
            type="password"
            label="New Password *"
            margin="normal"
            value={form.newPassword}
            onChange={(e) =>
              setForm({ ...form, newPassword: e.target.value })
            }
            InputProps={{
              startAdornment: <LockIcon sx={{ mr: 1 }} />,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
              },
            }}
          />

          {/* Confirm Password */}
          <TextField
            fullWidth
            type="password"
            label="Confirm Password *"
            margin="normal"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            InputProps={{
              startAdornment: <LockIcon sx={{ mr: 1 }} />,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
              },
            }}
          />

          {/* Disclaimer */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2,
                fontSize: 2,
                }}
          >
            Disclaimer: New Password must match with Confirm password.
          </Typography>

          {/* Submit Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              borderRadius: "30px",
              height: 45,
              background: "linear-gradient(90deg, #1e88e5, #1976d2)",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Submit
          </Button>
        </Box>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-3 text-sm font-semibold text-center text-gray-600 bg-white border-t">
        © Z1 Technology & Trade Pvt. Ltd | For Support & Inquiry:
        071-590132, 9857050123 | support@z1hrm.com
      </footer>
    </div>
  );
}
