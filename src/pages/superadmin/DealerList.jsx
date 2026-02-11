import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import http from "../../api/http";
import { API } from "../../api/endpoints";
import AppSnackbar from "../../components/AppSnackbar";

export default function DealerList() {
  const [dealers, setDealers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [deleteId, setDeleteId] = useState(null);
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const loadDealers = async () => {
    const res = await http.get(API.GET_ALL_DEALERS);
    setDealers(res.data || []);
  };

  useEffect(() => {
    let mounted = true;
    const fetchDealers = async () => {
      const res = await http.get(API.GET_ALL_DEALERS);
      if (mounted) setDealers(res.data || []);
    };
    fetchDealers();
    return () => {
      mounted = false;
    };
  }, []);

  /* ================= Toggle Dealer ================= */
  const toggleStatus = async (id) => {
    await http.patch(`/SuperAdmin/toggle-dealer-status/${id}`);
    loadDealers();
    setSnack({
      open: true,
      message: "Dealer status अपडेट भयो",
      severity: "success",
    });
  };

  /* ================= Delete Dealer ================= */
  const confirmDelete = async () => {
    try {
      await http.delete(`/SuperAdmin/delete-dealer/${deleteId}`);
      setSnack({
        open: true,
        message: "Dealer सफलतापूर्वक delete भयो",
        severity: "success",
      });
      setDeleteId(null);
      loadDealers();
    } catch (err) {
      setSnack({
        open: true,
        message: err.response?.data?.message || "पहिले Office manage गर्नुहोस्",
        severity: "error",
      });
    }
  };

  const filtered = dealers.filter(
    (d) =>
      d.dealerName?.toLowerCase().includes(search.toLowerCase()) ||
      d.mobileNumber?.includes(search),
  );

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <TextField
            size="small"
            label="Search Dealer"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => navigate("/dashboard/superadmin/dealers/create")}
          >
            + Create Dealer
          </Button>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Dealer</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((d, index) => (
                <TableRow key={d.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "grey.50" : "white",
                }}
                >
                  <TableCell>{d.dealerName}</TableCell>
                  <TableCell>{d.mobileNumber}</TableCell>
                  <TableCell>
                    <Switch
                      checked={d.isActive}
                      onChange={() => toggleStatus(d.id)}
                    />
                  </TableCell>

                  <TableCell align="right">
                      <Tooltip title="Edit">
                            <IconButton
                              onClick={() =>
                                navigate(`/dashboard/superadmin/dealers/edit/${d.id}`, {
                                  state: d,
                                })
                              }
                            >
                              <EditIcon />
                            </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => setDeleteId(d.id)}>
                      <DeleteIcon />
                    </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

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
      </CardContent>

      {/* ===== Delete Confirmation ===== */}
      <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete Dealer?</DialogTitle>
        <DialogContent>
          यो dealer delete गर्दा permanent हुनेछ। Office भए delete हुँदैन।
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <AppSnackbar
        open={snack.open}
        message={snack.message}
        severity={snack.severity}
        onClose={() => setSnack({ ...snack, open: false })}
      />
    </Card>
  );
}
