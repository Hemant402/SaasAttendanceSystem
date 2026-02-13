import { Box, Typography, TextField, Button, InputAdornment, IconButton } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import attendanceimg from "../../assets/attendanceimgs.webp";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function ChangePassword() {
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* LEFT SIDE (Same as Login Page) */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
          <div className="w-80 h-80 rounded-full bg-gray-100 flex items-center justify-center">
            <img src={attendanceimg} alt="Attendance Login Illustration" className="w-52 opacity-90"/>
          </div>
        </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center justify-center w-1/2 px-12">
              <Box className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl">

                <Typography
                  variant="h5"
                  fontWeight={700}
                  textAlign="center"
                  gutterBottom
                >
                  Change Password
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                  sx={{ mb: 4 }}
                >
                  Please enter your new password below
                </Typography>

                {/* New Password */}
                <TextField
                  fullWidth
                  type="password"
                  label="New Password"
                  margin="normal"
                  value={form.newPassword}
                  onChange={(e) =>
                    setForm({ ...form, newPassword: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "40px",
                      height: 52,
                    },
                  }}
                />

                {/* Confirm Password */}
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  margin="normal"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "40px",
                      height: 52,
                    },
                  }}
                />

                {/* Password Rule */}
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1, display: "block" }}
                >
                  Disclaimer: New password must match the confirm password.
                </Typography>

                {/* Submit Button */}
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 4,
                    height: 50,
                    borderRadius: "40px",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: 16,
                    background: "linear-gradient(90deg, #1e88e5, #1565c0)",
                    boxShadow: "0 8px 20px rgba(21, 101, 192, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(90deg, #1565c0, #0d47a1)",
                    },
                  }}
                >
                  Update Password
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
