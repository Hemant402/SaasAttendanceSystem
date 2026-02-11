// import { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   TextField,
//   Switch,
//   Button,
//   Divider,
// } from "@mui/material";
// import http from "../../api/http";
// import { API } from "../../api/endpoints";
// import AppSnackbar from "../../components/AppSnackbar";
//
// export default function SystemSettings() {
//   const [form, setForm] = useState({
//     systemName: "",
//     superAdminUsername: "",
//     newPassword: "",
//     supportEmail: "",
//     supportPhone: "",
//     isMaintenanceMode: false,
//     smsApiUrl: "",
//     smsToken: "",
//     smsSenderId: "",
//     fcmServerKey: "",
//     fcmSenderId: "",
//   });
//
//   const [snack, setSnack] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//
//   /* =============================
//      Load settings on page load
//      ============================= */
//   useEffect(() => {
//     const loadSettings = async () => {
//       const res = await http.get(API.GET_SYSTEM_SETTINGS);
//       setForm((prev) => ({
//         ...prev,
//         ...res.data,
//         newPassword: "", // never prefill password
//       }));
//     };
//     loadSettings();
//   }, []);
//
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };
//
//   const handleSave = async () => {
//     try {
//       await http.post(API.UPDATE_SYSTEM_SETTINGS, form);
//       setSnack({
//         open: true,
//         message: "System settings सफलतापूर्वक अपडेट भयो",
//         severity: "success",
//       });
//       setForm({ ...form, newPassword: "" });
//     } catch {
//       setSnack({
//         open: true,
//         message: "Settings update गर्दा समस्या आयो",
//         severity: "error",
//       });
//     }
//   };
//
//   return (
//     <Card>
//       <CardContent className="space-y-6">
//         <h2 className="text-xl font-semibold">System Settings</h2>
//
//         {/* ===== General ===== */}
//         <Divider textAlign="left">General</Divider>
//
//         <TextField
//           fullWidth
//           label="System Name"
//           name="systemName"
//           value={form.systemName}
//           onChange={handleChange}
//         />
//
//         <TextField
//           fullWidth
//           label="Super Admin Username"
//           name="superAdminUsername"
//           value={form.superAdminUsername}
//           onChange={handleChange}
//         />
//
//         <TextField
//           fullWidth
//           label="New Password"
//           type="password"
//           name="newPassword"
//           value={form.newPassword}
//           onChange={handleChange}
//           helperText="खाली छोड्दा पासवर्ड परिवर्तन हुँदैन"
//         />
//
//         {/* ===== Support ===== */}
//         <Divider textAlign="left">Support Contact</Divider>
//
//         <TextField
//           fullWidth
//           label="Support Email"
//           name="supportEmail"
//           value={form.supportEmail || ""}
//           onChange={handleChange}
//         />
//
//         <TextField
//           fullWidth
//           label="Support Phone"
//           name="supportPhone"
//           value={form.supportPhone || ""}
//           onChange={handleChange}
//         />
//
//         {/* ===== System Mode ===== */}
//         <Divider textAlign="left">System Mode</Divider>
//
//         <div className="flex items-center gap-4">
//           <Switch
//             checked={form.isMaintenanceMode}
//             onChange={(e) =>
//               setForm({ ...form, isMaintenanceMode: e.target.checked })
//             }
//           />
//           <span>Maintenance Mode</span>
//         </div>
//
//         {/* ===== SMS ===== */}
//         <Divider textAlign="left">SMS Configuration</Divider>
//
//         <TextField
//           fullWidth
//           label="SMS API URL"
//           name="smsApiUrl"
//           value={form.smsApiUrl}
//           onChange={handleChange}
//         />
//
//         <TextField
//           fullWidth
//           label="SMS Token"
//           name="smsToken"
//           value={form.smsToken}
//           onChange={handleChange}
//         />
//
//         <TextField
//           fullWidth
//           label="SMS Sender ID"
//           name="smsSenderId"
//           value={form.smsSenderId}
//           onChange={handleChange}
//         />
//
//         {/* ===== FCM ===== */}
//         <Divider textAlign="left">FCM Notification</Divider>
//
//         <TextField
//           fullWidth
//           label="FCM Server Key"
//           name="fcmServerKey"
//           value={form.fcmServerKey}
//           onChange={handleChange}
//         />
//
//         <TextField
//           fullWidth
//           label="FCM Sender ID"
//           name="fcmSenderId"
//           value={form.fcmSenderId || ""}
//           onChange={handleChange}
//         />
//
//         {/* ===== Action ===== */}
//         <div className="flex justify-end">
//           <Button variant="contained" onClick={handleSave}>
//             Save Settings
//           </Button>
//         </div>
//       </CardContent>
//
//       <AppSnackbar
//         open={snack.open}
//         message={snack.message}
//         severity={snack.severity}
//         onClose={() => setSnack({ ...snack, open: false })}
//       />
//     </Card>
//   );
// }
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Switch,
  Button,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import http from "../../api/http";
import { API } from "../../api/endpoints";
import AppSnackbar from "../../components/AppSnackbar";

export default function SystemSettings() {
  const [tab, setTab] = useState(0);

  const [form, setForm] = useState({
    systemName: "",
    superAdminUsername: "",
    newPassword: "",
    supportEmail: "",
    supportPhone: "",
    isMaintenanceMode: false,
    fcmServerKey: "",
    fcmSenderId: "",
  });

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  /* =============================
     Load settings
  ============================= */
  useEffect(() => {
    const loadSettings = async () => {
      const res = await http.get(API.GET_SYSTEM_SETTINGS);
      setForm((prev) => ({
        ...prev,
        ...res.data,
        newPassword: "",
      }));
    };
    loadSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async () => {
    try {
      await http.post(API.UPDATE_SYSTEM_SETTINGS, form);
      setSnack({
        open: true,
        message: "System settings सफलतापूर्वक अपडेट भयो",
        severity: "success",
      });
      setForm({ ...form, newPassword: "" });
    } catch {
      setSnack({
        open: true,
        message: "Settings update गर्दा समस्या आयो",
        severity: "error",
      });
    }
  };

  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-semibold mb-6">System Settings</h2>

        <Box sx={{ display: "flex", gap: 4 }}>
          {/* LEFT SIDE MENU */}
          <Tabs
            orientation="vertical"
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            sx={{ borderRight: 1, borderColor: "divider", minWidth: 220 }}
          >
            <Tab label="General" />
            <Tab label="Support Contact" />
            <Tab label="System Mode" />
            <Tab label="FCM Notification" />
          </Tabs>

          {/* RIGHT SIDE CONTENT */}
          <Box sx={{ flex: 1 }}>

            {/* ===== General ===== */}
            {tab === 0 && (
              <Box className="space-y-4">
                <TextField
                  fullWidth
                  label="System Name"
                  name="systemName"
                  value={form.systemName}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="Super Admin Username"
                  name="superAdminUsername"
                  value={form.superAdminUsername}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  helperText="खाली छोड्दा पासवर्ड परिवर्तन हुँदैन"
                />
              </Box>
            )}

            {/* ===== Support Contact ===== */}
            {tab === 1 && (
              <Box className="space-y-4">
                <TextField
                  fullWidth
                  label="Support Email"
                  name="supportEmail"
                  value={form.supportEmail || ""}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="Support Phone"
                  name="supportPhone"
                  value={form.supportPhone || ""}
                  onChange={handleChange}
                />
              </Box>
            )}

            {/* ===== System Mode ===== */}
            {tab === 2 && (
              <Box className="space-y-4">
                <div className="flex items-center gap-4">
                  <Switch
                    checked={form.isMaintenanceMode}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        isMaintenanceMode: e.target.checked,
                      })
                    }
                  />
                  <span>Maintenance Mode</span>
                </div>
              </Box>
            )}

            {/* ===== FCM Notification ===== */}
            {tab === 3 && (
              <Box className="space-y-4">
                <TextField
                  fullWidth
                  label="FCM Server Key"
                  name="fcmServerKey"
                  value={form.fcmServerKey}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="FCM Sender ID"
                  name="fcmSenderId"
                  value={form.fcmSenderId || ""}
                  onChange={handleChange}
                />
              </Box>
            )}

            {/* SAVE BUTTON */}
            <div className="flex justify-end mt-6">
              <Button variant="contained" onClick={handleSave}>
                Save Settings
              </Button>
            </div>

          </Box>
        </Box>
      </CardContent>

      <AppSnackbar
        open={snack.open}
        message={snack.message}
        severity={snack.severity}
        onClose={() => setSnack({ ...snack, open: false })}
      />
    </Card>
  );
}
