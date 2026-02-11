import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BusinessIcon from "@mui/icons-material/Business";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import http from "../../api/http";
import { API } from "../../api/endpoints";
import StatCard from "../../components/StatCard";

export default function DealerDashboard() {
  const [offices, setOffices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    http.get(API.DEALER_OFFICES).then((res) => {
      setOffices(res.data || []);
    });
  }, []);

  const today = new Date();

  const total = offices.length;
  const approved = offices.filter((o) => o.isApproved).length;
  const pending = offices.filter((o) => !o.isApproved).length;
  const expired = offices.filter(
    (o) => new Date(o.expireDate) < today
  ).length;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <StatCard
          title="Total Offices"
          value={total}
          icon={BusinessIcon}
          color="blue"
          onClick={() => navigate("/dashboard/dealer/offices")}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <StatCard
          title="Approved Offices"
          value={approved}
          icon={CheckCircleIcon}
          color="green"
          onClick={() =>
            navigate("/dashboard/dealer/offices?status=approved")
          }
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <StatCard
          title="Pending Offices"
          value={pending}
          icon={PendingActionsIcon}
          color="amber"
          onClick={() =>
            navigate("/dashboard/dealer/offices?status=pending")
          }
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <StatCard
          title="Expired Offices"
          value={expired}
          icon={HighlightOffIcon}
          color="red"
          onClick={() =>
            navigate("/dashboard/dealer/offices?status=expired")
          }
        />
      </Grid>
    </Grid>
  );
}
