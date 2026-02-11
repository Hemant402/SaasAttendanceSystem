import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import http from "../../api/http";
import { API } from "../../api/endpoints";

export default function DealerOfficeList() {
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    loadOffices();
  }, []);

  const loadOffices = async () => {
    try {
      const res = await http.get(API.DEALER_OFFICES);

      // ✅ Normalize dealer offices to match SuperAdmin structure
      const list = Array.isArray(res.data)
        ? res.data
        : res.data?.data || res.data?.offices || [];

      const normalized = list.map((o) => ({
        id: o.id || o._id,
        officeName: o.officeName,
        adminName: o.adminName,
        adminMobile: o.adminMobile,
        dealerName: o.dealerName || "You",
        isApproved: o.isApproved,
        expireDate: o.expireDate,
      }));

      setOffices(normalized);
    } catch (err) {
      console.error("Failed to load dealer offices", err);
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Office</TableCell>
          <TableCell>Admin</TableCell>
          <TableCell>Mobile</TableCell>
          <TableCell>Dealer</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Expire Date</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {offices.map((o) => (
          <TableRow key={o.id}>
            <TableCell>{o.officeName}</TableCell>
            <TableCell>{o.adminName}</TableCell>
            <TableCell>{o.adminMobile}</TableCell>
            <TableCell>{o.dealerName}</TableCell>

            <TableCell>
              {o.isApproved ? (
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
