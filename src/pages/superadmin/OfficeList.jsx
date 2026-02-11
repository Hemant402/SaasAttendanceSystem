import { useEffect, useState } from "react";
import http from "../../api/http";
import { API } from "../../api/endpoints";
import { useNavigate } from "react-router-dom";
import {Table, TableBody, TableCell, TableHead, TableRow,
  Chip,
  Button,
  TextField,
  Box,
  TablePagination,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import OfficeApproveDialog from "./OfficeApproveDialog";

export default function OfficeList() {
  const [offices, setOffices] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const [selectedOffice, setSelectedOffice] = useState(null);

  useEffect(() => {
    loadOffices();
  }, []);

  const loadOffices = async () => {
    try {
      const res = await http.get(API.GET_ALL_OFFICES);
      setOffices(res.data || []);
    } catch (err) {
      console.error("Failed to load offices", err);
    }
  };

  const handleEdit = (office) => {
  console.log("Edit clicked:", office);
  // TODO: Open Edit Dialog
};

  const filtered = offices.filter(
    (o) =>
      o.officeName?.toLowerCase().includes(search.toLowerCase()) ||
      o.adminName?.toLowerCase().includes(search.toLowerCase()) ||
      o.adminMobile?.includes(search) ||
      o.dealerName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* ===== Search ===== */}
      <Box className="mb-3">
        <TextField
          size="small"
          label="Search Office"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0); // ✅ reset page on search
          }}
        />
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Office</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Dealer</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filtered
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((o, index) => (
              <TableRow
                key={o.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "grey.50" : "white",
                }}
              >
                <TableCell>{o.officeName}</TableCell>
                <TableCell>{o.adminName}</TableCell>
                <TableCell>{o.adminMobile}</TableCell>
                <TableCell>{o.dealerName}</TableCell>

                <TableCell>
                  {o.isApproved ? (
                    <Chip label="Approved" color="success" />
                  ) : (
                    <Chip label="Pending" color="warning" />
                  )}
                </TableCell>

                    <TableCell>
                      <Box display="flex" gap={1}>
                        {/* Edit */}
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() =>
                              navigate(`/dashboard/superadmin/offices/edit/${o.id}`, {
                                state: o,
                              })
                            }
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>


                        {/* Delete */}
{/*                         <Tooltip title="Delete"> */}
{/*                           <IconButton */}
{/*                             size="small" */}
{/*                             color="error" */}
{/*                             onClick={() => handleDelete(o)} */}
{/*                           > */}
{/*                             <DeleteIcon fontSize="small" /> */}
{/*                           </IconButton> */}
{/*                         </Tooltip> */}

                        {/* Approve */}
                        <Tooltip title="Approve">
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => setSelectedOffice(o)}
                          >
                            <CheckCircleIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>

              </TableRow>
            ))}

          {filtered.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No offices found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* ===== Pagination (same as DealerList) ===== */}
      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100]}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />

      {selectedOffice && (
        <OfficeApproveDialog
          office={selectedOffice}
          onClose={() => setSelectedOffice(null)}
          onSuccess={loadOffices}
        />
      )}
    </>
  );
}
