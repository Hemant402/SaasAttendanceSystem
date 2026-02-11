import { useState } from "react";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InputAdornment from "@mui/material/InputAdornment";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import http from "../../api/http";
import { API } from "../../api/endpoints";
import { useNavigate } from "react-router-dom";
import * as jwtDecodeModule from "jwt-decode";
import { useAuth } from "../../auth/AuthProvider";
import attendanceimg from "../../assets/attendanceimgs.webp";

const jwtDecode =
  jwtDecodeModule?.default ?? jwtDecodeModule?.jwtDecode ?? jwtDecodeModule;

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  // const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
  username: "",
  password: "",
});

  const handleSubmit = async () => {
    const newErrors = {
    username: form.username ? "" : "Username is required",
    password: form.password ? "" : "Password is required",
  };

  setErrors(newErrors);

  // stop if any error exists
  if (newErrors.username || newErrors.password) return;

  try {
    const res = await http.post(API.LOGIN, form);
      if (res?.data) {
        const token = res.data.token ?? res.data;
        let userFromResp = res.data.user ?? null;

        if (!userFromResp && token) {
          try {
            const decoded = jwtDecode(token);
            userFromResp = decoded?.user ?? decoded ?? null;
          } catch (e) {
            console.warn("Token decode failed", e);
          }
        }

        login({ token, user: userFromResp });

        // show success popup
        setSuccessOpen(true);

        // redirect after short delay
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        alert("Login failed: empty response");
      }
    } catch (err) {
      alert("Login failed: " + (err?.response?.data?.message || err.message));
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Illustration */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
          <div className="w-80 h-80 rounded-full bg-gray-100 flex items-center justify-center">
            <img src={attendanceimg} alt="Attendance Login Illustration" className="w-52 opacity-90"/>
          </div>
        </div>

        {/* Right Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md px-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6"> ATTENDANCE LOGIN !</h2>

            <div className="space-y-4">
              <TextField placeholder="Username *" fullWidth variant="outlined" error={Boolean(errors.username)} helperText={errors.username} onChange={(e) => {setForm({ ...form, username: e.target.value });setErrors({ ...errors, username: "" });}}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon sx={{ color: "#9ca3af" }} />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: "9999px",
                      backgroundColor: "#f3f4f6",
                    },
                  }}
                />
                <TextField placeholder="Password *" type="password" fullWidth variant="outlined" error={Boolean(errors.password)} helperText={errors.password} onChange={(e) => {setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: "" });}}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ color: "#9ca3af" }} />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: "9999px",
                      backgroundColor: "#f3f4f6",
                    },
                  }}
                />
              <Button
                fullWidth
                size="large"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "#158eff",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "9999px",
                  py: 1.3,
                  "&:hover": {
                    backgroundColor: "#13fd6d",
                  },
                }}
              >
                LOGIN
              </Button>

              <p onClick={() => navigate("/forgot-password")} className="text-sm text-center text-gray-500 cursor-pointer hover:underline">
                Forgot Username / Password?
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-3 text-sm font-semibold text-center text-gray-700 bg-white/90">
        © Z1 Technology & Trade Pvt. Ltd | For Support & Inquiry: 071-590132,
        9857050123 | support@z1hrm.com
      </footer>

      {/* Success Popup */}
      <Snackbar
        open={successOpen}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          icon={<CheckCircleIcon fontSize="inherit" />}
          severity="success"
          variant="filled"
          sx={{
            fontSize: "1rem",
            alignItems: "center",
            borderRadius: "20px",
          }}
        >
          Login successful! Welcome back
        </Alert>
      </Snackbar>
    </div>
  );
}

