import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'userid', numeric: false, disablePadding: true, label: 'User ID' },
  { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
  { id: 'role', numeric: false, disablePadding: false, label: 'Role' },
  { id: 'firstname', numeric: false, disablePadding: false, label: 'First Name' },
  { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'mobilenumber', numeric: false, disablePadding: false, label: 'Mobile Number' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'admin_id', numeric: false, disablePadding: false, label: 'Admin ID' },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function EnhancedTableToolbar() {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        Users
      </Typography>
      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('userid');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/admin/usertable');
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = async (user) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    try {
      await axios.put(`http://localhost:3001/admin/usertable/${user.userid}/status`, { status: newStatus });
      fetchUsers();
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'User status has been updated.',
      });
    } catch (error) {
      console.error('Error updating status:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3001/admin/usertable/${selectedUser.userid}`, selectedUser);
      fetchUsers();
      setOpen(false);
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'User details have been updated.',
      });
    } catch (error) {
      console.error('Error updating user:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  const emptyRows = (rows, page, rowsPerPage) => page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = (rows, order, orderBy, page, rowsPerPage) => 
    stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const activeRows = rows.filter(row => row.status === 'active');
  const inactiveRows = rows.filter(row => row.status === 'inactive');

  const renderTable = (rows, title) => (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <Typography variant="h6" gutterBottom component="div" sx={{ padding: '16px', textAlign: 'center' }}>
        {title}
      </Typography>
      <EnhancedTableToolbar />
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {visibleRows(rows, order, orderBy, page, rowsPerPage).map((row, index) => {
              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={row.userid}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell align="center">{row.userid}</TableCell>
                  <TableCell align="center">{row.username}</TableCell>
                  <TableCell align="center">{row.role}</TableCell>
                  <TableCell align="center">{row.firstname}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.mobilenumber}</TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={row.status === 'active'}
                      onChange={() => handleStatusChange(row)}
                      color="primary"
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: row.status === 'active' ? 'green' : 'red',
                        display: 'inline-block',
                        marginLeft: '10px',
                      }}
                    >
                      {row.status}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{row.admin_id}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleEditClick(row)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows(rows, page, rowsPerPage) > 0 && (
              <TableRow style={{ height: 33 * emptyRows(rows, page, rowsPerPage) }}>
                <TableCell colSpan={12} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );

  return (
    <Box sx={{ width: '100%' }}>
      {renderTable(activeRows, "Active Users")}
      {renderTable(inactiveRows, "Inactive Users")}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', boxShadow: 24, margin: 'auto', width: '50%' }}>
          {selectedUser && (
            <form onSubmit={handleFormSubmit}>
              <TextField
                label="Username"
                name="username"
                value={selectedUser.username}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Role"
                name="role"
                value={selectedUser.role}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="First Name"
                name="firstname"
                value={selectedUser.firstname}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address"
                name="address"
                value={selectedUser.address}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                value={selectedUser.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Mobile Number"
                name="mobilenumber"
                value={selectedUser.mobilenumber}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '16px' }}>
                Save
              </Button>
            </form>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
