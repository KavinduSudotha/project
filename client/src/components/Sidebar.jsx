import * as React from "react";
import { usePageName } from "../context/PageNameContext";
import { styled, useTheme } from "@mui/material/styles";
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
import LogoutIcon from "@mui/icons-material/Logout";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
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
import {jwtDecode} from "jwt-decode";
import { FiLogOut, FiSettings, FiUsers } from "react-icons/fi";
import { useState } from "react";

// Importing ProfileDialog component
import ProfileDialog from './ProfileDialog';
// Add MailIcon import
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 240;
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  "@media all": {
    minHeight: 64,
  },
}));

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

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

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

export default function MiniDrawer({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { pageName } = usePageName();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let menuItems = [];

  const storedData = localStorage.getItem("token");
  let UserType = "";
  let userId = null; // Declare userId variable
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    const decodedToken = jwtDecode(parsedData.token);
    UserType = decodedToken.role;
    userId = decodedToken.userid; // Extract userId from the token
  }

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
        { name: "Logout", icon: LogoutIcon, action: handleLogout },
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
        { name: "Logout", icon: LogoutIcon, action: handleLogout },
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
       // continued from previous code snippet...

       { name: "Logout", icon: LogoutIcon, action: handleLogout },
      ];
      break;
    default:
      menuItems = [
        { name: "Home", icon: HomeIcon, link: "/" },
        { name: "Login", icon: AccountCircle, link: "/login" },
        { name: "Register", icon: AccountCircle, link: "/register" },
      ];
  }

  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  const handleProfileDialogOpen = () => {
    setProfileDialogOpen(true);
  };

  const handleProfileDialogClose = () => {
    setProfileDialogOpen(false);
  };

  // Define renderMenu and renderMobileMenu functions
  const renderMenu = (
    <Menu
      anchorEl={null}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={false}
      onClose={() => {}} // Replace with proper onClose logic
    >
      <MenuItem onClick={handleProfileDialogOpen}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={null}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={false}
      onClose={() => {}} // Replace with proper onClose logic
    >
      <MenuItem onClick={handleProfileDialogOpen}>
        <IconButton size="large" aria-label="account of current user" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <IconButton size="large" aria-label="logout" color="inherit">
          <FiLogOut />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );
  
  // Return JSX structure
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: "36px", ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {pageName}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileDialogOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={() => {}}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </StyledToolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} component="a" href={item.link}>
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
      {/* ProfileDialog component */}
      <ProfileDialog open={profileDialogOpen} handleClose={handleProfileDialogClose}  userId={userId}/>
      {/* Render menus */}
      {renderMenu}
      {renderMobileMenu}
    </Box>
  );

  
}

