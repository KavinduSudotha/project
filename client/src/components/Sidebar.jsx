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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
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
  FiShoppingCart,
  FiPackage,
  FiBarChart2,
  FiSettings,
  FiUsers,
} from "react-icons/fi"; // Importing icons from react-icons

const drawerWidth = 240; // Setting the drawer width

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
  // necessary for content to be below app bar
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
        { name: "Reports", icon: TextSnippetIcon, link: "/director-dashboard/reports" },
        { name: "Admins", icon: SupervisorAccountIcon, link: "/director-dashboard/admin" },
        { name: "Settings", icon: FiSettings, link: "/director-dashboard/settings" },
        { name: "Employee", icon: FiUsers, link: "/director-dashboard/employeepage" },
        { name: "Logout", icon: FiLogOut, action: handleLogout }, // Added logout item
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
        { name: "Logout", icon: FiLogOut, action: handleLogout }, // Added logout item
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
        { name: "Logout", icon: FiLogOut, action: handleLogout }, // Added logout item
      ];
      break;
    case "Employer":
      menuItems = [
        { name: "Home", icon: HomeIcon, link: "/Employer-dashboard" },
        { name: "Price List", icon: ContentPasteIcon, link: "/Employer-dashboard/pricelist" },
        { name: "Use RAW", icon: FileUploadIcon, link: "/Employer-dashboard/rawuse" },
        { name: "Add wastage", icon: DeleteIcon, link: "/Employer-dashboard/addwastagepage" },
        { name: "Jobs", icon: WorkHistoryIcon, link: "/Employer-dashboard/updatejob" },
        { name: "Logout", icon: FiLogOut, action: handleLogout }, // Added logout item
      ];
      break;
  }

  return (
    <Box sx={{ display: "flex" }}>
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
              ...(open && { display: "none" }),
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
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
  {menuItems.map((item, index) => (
    <React.Fragment key={item.name}>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
          component={item.link ? "a" : "button"}
          href={item.link ? item.link : undefined}
          onClick={item.action ? item.action : undefined}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {React.createElement(item.icon)}
          </ListItemIcon>
          <ListItemText
            primary={item.name}
            sx={{ opacity: open ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>
      {item.subSections &&
        item.subSections.map((subItem) => (
          <ListItem
            key={subItem.name}
            disablePadding
            sx={{ display: "block", pl: 4 }}
          >
            <ListItemButton
              sx={{
                minHeight: 36,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              component="a"
              href={subItem.link}
            >
              <ListItemText
                primary={subItem.name}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
    </React.Fragment>
  ))}
</List>

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        {/* Content can be added here */}
      </Box>
    </Box>
  );
}
