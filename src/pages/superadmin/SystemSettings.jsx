
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
import { useTranslation } from "react-i18next";


export default function SystemSettings() {
  const [tab, setTab] = useState(0);
  const { t } = useTranslation();

  const [form, setForm] = useState({
    systemName: "",
    superAdminUsername: "",
    newPassword: "",
    supportEmail: "",
    supportPhone: "",
    isMaintenanceMode: false,

    // ✅ SMS fields restored
    smsApiUrl: "",
    smsToken: "",
    smsSenderId: "",

    // ✅ FCM
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
        <h2 className="text-xl font-semibold mb-6">{t("systemSettings")}</h2>

        <Box sx={{ display: "flex", gap: 4 }}>

          {/* ===== LEFT SIDE MENU ===== */}
          <Tabs
            orientation="vertical"
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            sx={{ borderRight: 1, borderColor: "divider", minWidth: 220 }}
          >
            <Tab label={t("general")} />
            <Tab label={t("supportContact")} />
            <Tab label={t("systemMode")} />
            <Tab label={t("smsConfiguration")} /> {/* ✅ Added */}
            <Tab label={t("fcmNotification")} />
          </Tabs>

          {/* ===== RIGHT SIDE CONTENT ===== */}
          <Box sx={{ flex: 1 }}>

            {/* ===== General ===== */}
            {tab === 0 && (
              <Box className="space-y-4">
                <TextField
                  fullWidth
                  label={t("systemName")}
                  name="systemName"
                  value={form.systemName}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label={t("superAdminUsername")}
                  name="superAdminUsername"
                  value={form.superAdminUsername}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label={t("password")}
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
                  label={t("supportEmail")}
                  name="supportEmail"
                  value={form.supportEmail || ""}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label={t("supportPhone")}
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
                  <span>{t("maintenanceMode")}</span>
                </div>
              </Box>
            )}

            {/* ===== SMS Configuration ===== */}
            {tab === 3 && (
              <Box className="space-y-4">
                <TextField
                  fullWidth
                  label={t("smsApiUrl")}
                  name="smsApiUrl"
                  value={form.smsApiUrl}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label={t("smsToken")}
                  name="smsToken"
                  value={form.smsToken}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label={t("smsSenderId")}
                  name="smsSenderId"
                  value={form.smsSenderId}
                  onChange={handleChange}
                />
              </Box>
            )}

            {/* ===== FCM Notification ===== */}
            {tab === 4 && (
              <Box className="space-y-4">
                <TextField
                  fullWidth
                  label={t("fcmServerKey")}
                  name="fcmServerKey"
                  value={form.fcmServerKey}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label={t("fcmSenderId")}
                  name="fcmSenderId"
                  value={form.fcmSenderId || ""}
                  onChange={handleChange}
                />
              </Box>
            )}

            {/* ===== SAVE BUTTON ===== */}
            <div className="flex justify-end mt-6">
              <Button variant="contained" onClick={handleSave}>
                {t("saveSettings")}
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
