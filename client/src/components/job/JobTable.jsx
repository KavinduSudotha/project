import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Swal from 'sweetalert2';

function createData(job_id, created_date, due_date, customer_name, address, chip_type, peat_type, status, note, sheetDetails, transportDetails) {
  return {
    job_id,
    created_date,
    due_date,
    customer_name,
    address,
    chip_type,
    peat_type,
    status,
    note,
    sheetDetails,
    transportDetails,
  };
}

function Row(props) {
  const { row, updateStatus, deleteJob, updateJob } = props;
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(row.status);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [editedRow, setEditedRow] = React.useState({ ...row });
  const [errors, setErrors] = React.useState({});

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    updateStatus(row.job_id, event.target.value);
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteJob(row.job_id);
        Swal.fire('Deleted!', 'Your job has been deleted.', 'success');
      }
    });
  };

  const handleEditOpen = () => {
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.customer_name = editedRow.customer_name ? "" : "Customer Name is required.";
    tempErrors.address = editedRow.address ? "" : "Address is required.";
    tempErrors.chip_type = editedRow.chip_type ? "" : "Chip Type is required.";
    tempErrors.peat_type = editedRow.peat_type ? "" : "Peat Type is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleEditSave = () => {
    if (validate()) {
      updateJob(editedRow);
      handleEditClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRow({ ...editedRow, [name]: value });
  };

  return (
    <React.Fragment>
      <TableRow className="bg-gray-100">
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.job_id}</TableCell>
        <TableCell>{row.created_date}</TableCell>
        <TableCell>{row.due_date}</TableCell>
        <TableCell>{row.customer_name}</TableCell>
        <TableCell>{row.address}</TableCell>
        <TableCell>{row.chip_type}</TableCell>
        <TableCell>{row.peat_type}</TableCell>
        
        <TableCell>
          <Select
            value={status}
            onChange={handleStatusChange}
            style={{ width: "13vh" }}
          >
            {['unstarted', 'started', 'Gathering raw', 'Processing', 'Hold', 'completed', 'cancelled'].map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </TableCell>
        <TableCell>{row.note}</TableCell>
        <TableCell>  
          <IconButton aria-label="edit" onClick={handleEditOpen}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className="m-2">
              <Typography variant="h6" gutterBottom component="div">
                Sheet Details
              </Typography>
              <Table size="small" aria-label="sheet details">
                <TableHead>
                  <TableRow>
                    <TableCell>Height</TableCell>
                    <TableCell>Width</TableCell>
                    <TableCell>Length</TableCell>
                    <TableCell>Ratio Chips</TableCell>
                    <TableCell>Ratio Peat</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Sheet per Pallet</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.height ?? 'N/A'}</TableCell>
                    <TableCell>{row.width ?? 'N/A'}</TableCell>
                    <TableCell>{row.length ?? 'N/A'}</TableCell>
                    <TableCell>{row.ratio_chips ?? 'N/A'}</TableCell>
                    <TableCell>{row.ratio_peat ?? 'N/A'}</TableCell>
                    <TableCell>{row.weight ?? 'N/A'}</TableCell>
                    <TableCell>{row.quantity ?? 'N/A'}</TableCell>
                    <TableCell>{row.sheet_per_pallet ?? 'N/A'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Typography variant="h6" gutterBottom component="div" className="mt-4">
                Transport Details
              </Typography>
              <Table size="small" aria-label="transport details">
                <TableHead>
                  <TableRow>
                    <TableCell>Container Size</TableCell>
                    <TableCell>Pallets per Container</TableCell>
                    <TableCell>Driver Name</TableCell>               
                    <TableCell>Vehicle Number</TableCell>
                    <TableCell>Transport Company</TableCell>                
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.container_size ?? 'N/A'}</TableCell>
                    <TableCell>{row.pallets_per_container ?? 'N/A'}</TableCell>
                    <TableCell>{row.driver_name ?? 'N/A'}</TableCell>               
                    <TableCell>{row.vehicle_number ?? 'N/A'}</TableCell>
                    <TableCell>{row.transport_company ?? 'N/A'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog open={editModalOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Job</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Customer Name"
            type="text"
            fullWidth
            name="customer_name"
            value={editedRow.customer_name}
            onChange={handleChange}
            error={Boolean(errors.customer_name)}
            helperText={errors.customer_name}
          />
          <TextField
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            name="address"
            value={editedRow.address}
            onChange={handleChange}
            error={Boolean(errors.address)}
            helperText={errors.address}
          />
          <TextField
            margin="dense"
            label="Chip Type"
            type="text"
            fullWidth
            name="chip_type"
            value={editedRow.chip_type}
            onChange={handleChange}
            error={Boolean(errors.chip_type)}
            helperText={errors.chip_type}
          />
          <TextField
            margin="dense"
            label="Peat Type"
            type="text"
            fullWidth
            name="peat_type"
            value={editedRow.peat_type}
            onChange={handleChange}
            error={Boolean(errors.peat_type)}
            helperText={errors.peat_type}
          />
          <TextField
            margin="dense"
            label="Status"
            type="text"
            fullWidth
            name="status"
            value={editedRow.status}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Note"
            type="text"
            fullWidth
            name="note"
            value={editedRow.note}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Height"
            type="text"
            fullWidth
            name="height"
            value={editedRow.height}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Width"
            type="text"
            fullWidth
            name="width"
            value={editedRow.width}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Length"
            type="text"
            fullWidth
            name="length"
            value={editedRow.length}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Ratio Chips"
            type="text"
            fullWidth
            name="ratio_chips"
            value={editedRow.ratio_chips}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Ratio Peat"
            type="text"
            fullWidth
            name="ratio_peat"
            value={editedRow.ratio_peat}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Weight"
            type="text"
            fullWidth
            name="weight"
            value={editedRow.weight}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="text"
            fullWidth
            name="quantity"
            value={editedRow.quantity}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Sheet per Pallet"
            type="text"
            fullWidth
            name="sheet_per_pallet"
            value={editedRow.sheet_per_pallet}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Container Size"
            type="text"
            fullWidth
            name="container_size"
            value={editedRow.container_size}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Pallets per Container"
            type="text"
            fullWidth
            name="pallets_per_container"
            value={editedRow.pallets_per_container}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Driver Name"
            type="text"
            fullWidth
            name="driver_name"
            value={editedRow.driver_name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Vehicle Number"
            type="text"
            fullWidth
            name="vehicle_number"
            value={editedRow.vehicle_number}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Transport Company"
            type="text"
            fullWidth
            name="transport_company"
            value={editedRow.transport_company}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    job_id: PropTypes.number.isRequired,
    created_date: PropTypes.string.isRequired,
    due_date: PropTypes.string.isRequired,
    customer_name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    chip_type: PropTypes.string.isRequired,
    peat_type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    note: PropTypes.string,
    sheetDetails: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number,
      length: PropTypes.number,
      ratio_chips: PropTypes.number,
      ratio_peat: PropTypes.number,
      weight: PropTypes.number,
      quantity: PropTypes.number,
      sheet_per_pallet: PropTypes.number,
    }),
    transportDetails: PropTypes.shape({
      container_size: PropTypes.number,
      pallets_per_container: PropTypes.number,
      driver_name: PropTypes.string,
      vehicle_type: PropTypes.string,
      vehicle_number: PropTypes.number,
      transport_company: PropTypes.string,
      production_logistics_manager_id: PropTypes.string,
    }),
  }).isRequired,
  updateStatus: PropTypes.func.isRequired,
  deleteJob: PropTypes.func.isRequired,
  updateJob: PropTypes.func.isRequired,
};

export default function CollapsibleTable() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:3001/jobrout/jobs')
      .then((response) => setRows(response.data))
      .catch((error) => console.error(error));
  }, []);
  

  const updateStatus = (job_id, newStatus) => {
    axios.put(`http://localhost:3001/jobrout/updatejobstatus/${job_id}`, { status: newStatus })
      .then((response) => {
        setRows((prevRows) => prevRows.map((row) => (row.job_id === job_id ? { ...row, status: newStatus } : row)));
      })
      .catch((error) => console.error(error));
  };

  const deleteJob = (job_id) => {
    axios.delete(`http://localhost:3001/jobrout/deletejob/${job_id}`)
      .then((response) => {
        setRows((prevRows) => prevRows.filter((row) => row.job_id !== job_id));
      })
      .catch((error) => console.error(error));
  };

  const updateJob = (updatedRow) => {
    axios.put(`http://localhost:3001/jobrout/updatejob/${updatedRow.job_id}`, updatedRow)
      .then((response) => {
        setRows((prevRows) => prevRows.map((row) => (row.job_id === updatedRow.job_id ? updatedRow : row)));
      })
      .catch((error) => console.error(error));
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Job ID</TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Chip Type</TableCell>
            <TableCell>Peat Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.job_id} row={row} updateStatus={updateStatus} deleteJob={deleteJob} updateJob={updateJob} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
