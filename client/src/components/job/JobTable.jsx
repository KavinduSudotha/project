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
import axios from 'axios';
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

  const handleEdit = () => {
    setEditModalOpen(true);
    Swal.fire({
      title: 'Edit Job',
      html: `
        <form id="editForm">
          <input id="customer_name" class="swal2-input" placeholder="Customer Name" value="${editedRow.customer_name}">
          <input id="address" class="swal2-input" placeholder="Address" value="${editedRow.address}">
          <input id="chip_type" class="swal2-input" placeholder="Chip Type" value="${editedRow.chip_type}">
          <input id="peat_type" class="swal2-input" placeholder="Peat Type" value="${editedRow.peat_type}">
          <input id="note" class="swal2-input" placeholder="Note" value="${editedRow.note}">
        </form>
      `,
      preConfirm: () => {
        const customer_name = Swal.getPopup().querySelector('#customer_name').value;
        const address = Swal.getPopup().querySelector('#address').value;
        const chip_type = Swal.getPopup().querySelector('#chip_type').value;
        const peat_type = Swal.getPopup().querySelector('#peat_type').value;
        const note = Swal.getPopup().querySelector('#note').value;

        if (!customer_name || !address || !chip_type || !peat_type) {
          Swal.showValidationMessage(`Please fill in all fields`);
        }

        return { customer_name, address, chip_type, peat_type, note };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedData = result.value;
        setEditedRow({ ...editedRow, ...updatedData });
        updateJob({ ...editedRow, ...updatedData });
        setEditModalOpen(false);
      }
    });
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
  style={{ width: "13vh" }} // Apply custom height using inline style
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
          <IconButton aria-label="edit" onClick={handleEdit}>
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
