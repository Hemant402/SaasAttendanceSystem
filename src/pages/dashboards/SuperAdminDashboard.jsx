import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../api/http";
import { API } from "../../api/endpoints";
import StatCard from "../../components/StatCard";
import BusinessIcon from "@mui/icons-material/Business";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ScienceIcon from "@mui/icons-material/Science";
import { useTranslation } from "react-i18next";

function SuperAdminDashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const loadStats = async () => {
    try {
      const res = await http.get(API.OFFICE_STATS);
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load office stats", err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title={t("totalOffices")}
        value={stats.totalOffices}
        icon={BusinessIcon}
        color="blue"
        onClick={() => navigate("/dashboard/superadmin/offices")}
      />

      <StatCard
        title={t("approvedOffices")}
        value={stats.approvedOffices}
        icon={CheckCircleIcon}
        color="green"
        onClick={() =>
          navigate("/dashboard/superadmin/offices?status=approved")
        }
      />

      <StatCard
        title={t("pendingOffices")}
        value={stats.pendingOffices}
        icon={PendingActionsIcon}
        color="amber"
        onClick={() =>
          navigate("/dashboard/superadmin/offices?status=pending")
        }
      />

      <StatCard
        title={t("demoOffices")}
        value={stats.demoOffices}
        icon={ScienceIcon}
        color="purple"
        onClick={() =>
          navigate("/dashboard/superadmin/offices?status=demo")
        }
      />
    </div>
  );
}

export default SuperAdminDashboard;
