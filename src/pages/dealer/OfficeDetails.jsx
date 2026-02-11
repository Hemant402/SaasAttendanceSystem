import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@mui/material";

export default function OfficeDetails() {
  const { state } = useLocation();

  if (!state) return null;

  return (
    <Card>
      <CardContent className="space-y-2">
        <h2 className="text-xl font-semibold">{state.officeName}</h2>
        <p>Admin: {state.adminName}</p>
        <p>Mobile: {state.adminMobile}</p>
        <p>Status: {state.isApproved ? "Approved" : "Pending"}</p>
        <p>Expire: {state.expireDate?.substring(0, 10)}</p>
      </CardContent>
    </Card>
  );
}
