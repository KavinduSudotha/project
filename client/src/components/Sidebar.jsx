import * as React from "react";
import { usePageName } from "../context/PageNameContext"; // Importing the custom hook
import { styled, useTheme } from "@mui/material/styles"; // Importing MUI styling and theme hook
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import HomeIcon from "@mui/icons-material/Home";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import AddchartIcon from "@mui/icons-material/Addchart";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { jwtDecode } from "jwt-decode";
import {
  FiLogOut,
  FiSettings,
  FiUsers,
} from "react-icons/fi"; // Importing icons from react-icons

const drawerWidth = 240; // Setting the drawer width
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  '@media all': {
    minHeight: 64,
  },
}));

const handleLogout = () => {
  // Clear the local storage
  localStorage.removeItem("token");

  // Redirect to the login page or any other page
  window.location.href = "/";
};

// Mixin for opened drawer
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

// Mixin for closed drawer
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// Drawer header styling
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

// AppBar styling
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Drawer styling
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
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

  let menuItems = [];

  // Menu items data
  const storedData = localStorage.getItem("token");
  const parsedData = JSON.parse(storedData);
  const decodedToken = jwtDecode(parsedData.token);
  const UserType = decodedToken.role;

  switch (UserType) {
    case "Director":
      menuItems = [
        { name: "Home", icon: HomeIcon, link: "/director-dashboard" },
        { name: "Price List", icon: ContentPasteIcon, link: "/director-dashboard/pricelist" },
        { name: "Buy RAW", icon: FileDownloadIcon, link: "/director-dashboard/buyraw" },
        { name: "Use RAW", icon: FileUploadIcon, link: "/director-dashboard/rawuse" },
        { name: "Add wastage", icon: DeleteIcon, link: "/director-dashboard/addwastagepage" },
        { name: "Sell wastage", icon: DeleteSweepIcon, link: "/director-dashboard/sellwastagepage" },
        { name: "Inventory", icon: AddchartIcon, link: "/director-dashboard/inventory" },
        { name: "Jobs", icon: WorkHistoryIcon, link: "/director-dashboard/updatejob" },
        { name: "Admins", icon: SupervisorAccountIcon, link: "/director-dashboard/admin" },
        { name: "Logout", icon: LogoutIcon, action: handleLogout }, // Added logout item
      ];
      break;
    case "Manager":
      menuItems = [
        { name: "Home", icon: HomeIcon, link: "/Manager-dashboard" },
        { name: "Price List", icon: ContentPasteIcon, link: "/Manager-dashboard/pricelist" },
        { name: "Buy RAW", icon: FileDownloadIcon, link: "/Manager-dashboard/buyraw" },
        { name: "Use RAW", icon: FileUploadIcon, link: "/Manager-dashboard/rawuse" },
        { name: "Add wastage", icon: DeleteIcon, link: "/Manager-dashboard/addwastagepage" },
        { name: "Sell wastage", icon: DeleteSweepIcon, link: "/Manager-dashboard/sellwastagepage" },
        { name: "Inventory", icon: AddchartIcon, link: "/Manager-dashboard/inventory" },
        { name: "Jobs", icon: WorkHistoryIcon, link: "/Manager-dashboard/updatejob" },
        { name: "Logout", icon: LogoutIcon, action: handleLogout }, // Added logout item
      ];
      break;
    case "Supervisor":
      menuItems = [
        { name: "Home", icon: HomeIcon, link: "/Supervisor-dashboard" },
        { name: "Price List", icon: ContentPasteIcon, link: "/Supervisor-dashboard/pricelist" },
        { name: "Buy RAW", icon: FileDownloadIcon, link: "/Supervisor-dashboard/buyraw" },
        { name: "Use RAW", icon: FileUploadIcon, link: "/Supervisor-dashboard/rawuse" },
        { name: "Add wastage", icon: DeleteIcon, link: "/Supervisor-dashboard/addwastagepage" },
        { name: "Inventory", icon: AddchartIcon, link: "/Supervisor-dashboard/inventory" },
        { name: "Jobs", icon: WorkHistoryIcon, link: "/Supervisor-dashboard/updatejob" },
        { name: "Logout", icon: LogoutIcon, action: handleLogout }, // Added logout item
      ];
      break;
    case "Employer":
      menuItems = [
        { name: "Home", icon: HomeIcon, link: "/Employer-dashboard" },
        { name: "Price List", icon: ContentPasteIcon, link: "/Employer-dashboard/pricelist" },
        { name: "Use RAW", icon: FileUploadIcon, link: "/Employer-dashboard/rawuse" },
        { name: "Add wastage", icon: DeleteIcon, link: "/Employer-dashboard/addwastagepage" },
        { name: "Inventory", icon: AddchartIcon, link: "/Employer-dashboard/inventory" },
        { name: "Jobs", icon: WorkHistoryIcon, link: "/Employer-dashboard/updatejob" },
        { name: "Logout", icon: LogoutIcon, action: handleLogout }, // Added logout item
      ];
      break;
    default:
      break;
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem> {/* Added Logout MenuItem */}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: "flex" }}> {/* Removed zIndex here */}
      <CssBaseline /> {/* Adding baseline CSS for styling */}
      <AppBar position="fixed" open={open}> {/* Removed zIndex here */}
        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap component="div">
            {pageName} {/* Displaying the current page name */}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </StyledToolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.name} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => {
                  if (item.link) {
                    window.location.href = item.link;
                  } else if (item.action) {
                    item.action();
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <item.icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}> {/* Added Main component */}
        {/* <DrawerHeader /> */}
       
      </Main>
    </Box>
  );
}
