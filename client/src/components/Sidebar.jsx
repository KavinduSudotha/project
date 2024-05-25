import * as React from 'react';
import { usePageName } from '../context/PageNameContext'; // Importing the custom hook
import { styled, useTheme } from '@mui/material/styles'; // Importing MUI styling and theme hook
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import HomeIcon from '@mui/icons-material/Home';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import AddchartIcon from '@mui/icons-material/Addchart';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { FiHome, FiShoppingCart, FiPackage, FiBarChart2, FiSettings, FiUsers } from 'react-icons/fi'; // Importing icons from react-icons

const drawerWidth = 240; // Setting the drawer width

// Mixin for opened drawer
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

// Mixin for closed drawer
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// Drawer header styling
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// AppBar styling
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Drawer styling
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

// Main component function
export default function MiniDrawer() {
  const theme = useTheme(); // Hook to use the theme
  const [open, setOpen] = React.useState(false); // State to manage drawer open/close
  const { pageName } = usePageName(); // Accessing pageName from context

  const handleDrawerOpen = () => {
    setOpen(true); // Function to open the drawer
  };

  const handleDrawerClose = () => {
    setOpen(false); // Function to close the drawer
  };

  // Menu items data
  const menuItems = [
    { name: 'Home', icon: HomeIcon, link: '/homepage' },
    { name: 'Price List', icon: ContentPasteIcon , link: '/viewpricelist'},
    { name: 'Buy RAW', icon: FileDownloadIcon, link: '/rawbuypage'} ,
    { name: 'Use RAW', icon: FileUploadIcon, link: '/rawuse'} ,
    { name: 'Add wastage', icon: DeleteIcon, link: '/addwastagepage'} ,
    { name: 'Use RAW', icon: DeleteSweepIcon, link: '/sellwastagepage'} ,
    { name: 'Inventory', icon: AddchartIcon, link: '/inventory'},
    { name: 'Jobs', icon: WorkHistoryIcon, link: '/updatejob'},
    { name: 'Sheets', icon: FiHome, link: '/sheetpage' },
    { name: 'Reports', icon: FiBarChart2 },
    { name: 'Admins', icon: FiSettings },
    { name: 'Employee', icon: FiUsers , link: '/employeepage'}
  ];



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          {pageName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.name}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  component="a"
                  href={item.link ? item.link : '#'}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {React.createElement(item.icon)}
                  </ListItemIcon>
                  <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
              {item.subSections && item.subSections.map((subItem) => (
                <ListItem key={subItem.name} disablePadding sx={{ display: 'block', pl: 4 }}>
                  <ListItemButton
                    sx={{
                      minHeight: 36,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    component="a"
                    href={subItem.link}
                  >
                    <ListItemText primary={subItem.name} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* Content can be added here */}
      </Box>
    </Box>
  );
}
