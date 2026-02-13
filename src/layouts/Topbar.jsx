import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Divider,
  Badge,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import LanguageIcon from "@mui/icons-material/Language";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import LockResetIcon from "@mui/icons-material/LockReset";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useTranslation } from "react-i18next";
import connection, { startConnection } from "../services/signalrService";

export default function Topbar({ toggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [langAnchor, setLangAnchor] = useState(null);
  const [userAnchor, setUserAnchor] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { t, i18n } = useTranslation();

  /* ================= SIGNALR ================= */
  useEffect(() => {
    let isMounted = true;

    const initSignalR = async () => {
      try {
        await startConnection();

        // remove old listener if exists (prevent duplicates)
        connection.off("ReceiveNotification");

        connection.on("ReceiveNotification", (message) => {
          if (!isMounted) return;

          const newNotification = {
            id: Date.now(),
            name: "System",
            message,
            date: new Date().toLocaleString(),
            unread: true,
          };

          setNotifications((prev) => [newNotification, ...prev]);
        });
      } catch (err) {
        console.error("SignalR connection failed:", err);
      }
    };

    initSignalR();

    return () => {
      isMounted = false;
      connection.off("ReceiveNotification");
    };
  }, []);

  /* ================= DERIVED VALUES ================= */
  const unreadCount = notifications.filter((n) => n.unread).length;

  /* ================= MARK AS READ WHEN OPEN ================= */
  useEffect(() => {
    if (notifAnchor) {
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, unread: false }))
      );
    }
  }, [notifAnchor]);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  /* ================= FULLSCREEN ================= */
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <AppBar position="static" color="inherit" elevation={1}>
      <Toolbar className="flex justify-between">

        {/* LEFT SECTION */}
        <Box className="flex items-center gap-2">
          <IconButton onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" fontWeight="bold">
            {t("dashboard")}
          </Typography>
        </Box>

        {/* RIGHT SECTION */}
        <Box className="flex items-center gap-2">

          {/* Fullscreen */}
          <IconButton onClick={toggleFullscreen}>
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>

          {/* Notification Bell */}
          <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={notifAnchor}
            open={Boolean(notifAnchor)}
            onClose={() => setNotifAnchor(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                width: 380,
                maxHeight: 450,
                borderRadius: 2,
              },
            }}
          >
            <Paper elevation={0} sx={{ p: 2 }}>
              <Typography fontWeight="bold" fontSize={18}>
                {t("notifications")}
              </Typography>

              <Tabs
                value={tabValue}
                onChange={(e, val) => setTabValue(val)}
                textColor="primary"
                indicatorColor="primary"
                sx={{ mt: 1 }}
              >
                <Tab label={t("all")} />
                <Tab label={t("unread")} />
              </Tabs>

              <List sx={{ mt: 1 }}>
                {notifications
                  .filter((n) => (tabValue === 1 ? n.unread : true))
                  .map((notif) => (
                    <ListItem
                      key={notif.id}
                      alignItems="flex-start"
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        backgroundColor: notif.unread
                          ? "#f5faff"
                          : "transparent",
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "#158eff" }}>
                          <AccessTimeIcon />
                        </Avatar>
                      </ListItemAvatar>

                      <ListItemText
                        primary={
                          <Typography fontSize={14}>
                            <b>{notif.name}</b> {notif.message}
                          </Typography>
                        }
                        secondary={
                          <Typography fontSize={12} color="text.secondary">
                            {notif.date}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </Menu>

          {/* Language */}
          <IconButton onClick={(e) => setLangAnchor(e.currentTarget)}>
            <LanguageIcon />
          </IconButton>
          <Menu
            anchorEl={langAnchor}
            open={Boolean(langAnchor)}
            onClose={() => setLangAnchor(null)}
          >
{/*             <MenuItem>English</MenuItem> */}
{/*             <MenuItem>Nepali</MenuItem> */}
            <MenuItem onClick={() => {i18n.changeLanguage("en");
                setLangAnchor(null);}}>
                {t("english")}
            </MenuItem>
            <MenuItem onClick={() => {i18n.changeLanguage("np");
                setLangAnchor(null);}}>
              {t("nepali")}
            </MenuItem>

          </Menu>

          {/* User Menu */}
          <Box
            onClick={(e) => setUserAnchor(e.currentTarget)}
            className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100"
          >
            <Avatar sx={{ bgcolor: "#158eff", width: 34, height: 34 }}>
              <AccountCircleIcon />
            </Avatar>
            <Typography fontSize={14} fontWeight={500}>
              {user?.fullName || "User"}
            </Typography>
          </Box>

          <Menu
            anchorEl={userAnchor}
            open={Boolean(userAnchor)}
            onClose={() => setUserAnchor(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem>
              <SwapHorizIcon fontSize="small" sx={{ mr: 1 }} />
             {t("changeRole")}
            </MenuItem>

            <MenuItem onClick={() => navigate("/dashboards/SuperAdminDashboard")}>
              <LockResetIcon fontSize="small" sx={{ mr: 1 }} />
              {t("changePassword")}
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
              {t("logout")}
            </MenuItem>
          </Menu>

        </Box>
      </Toolbar>
    </AppBar>
  );
}
