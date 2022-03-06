import { useState, useEffect, SetStateAction, SyntheticEvent } from "react";
import { ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { auth } from "../utils/firebaseConfig";
import { onAuthStateChanged, signOut } from "@firebase/auth";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { MdAddPhotoAlternate } from "react-icons/md";
import { MdVideoCameraFront } from "react-icons/md";
import { MdOutlineLanguage } from "react-icons/md";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { MdAnalytics } from "react-icons/md";

import theme from "../utils/theme";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AdminPanel = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<{} | null>({});

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const actions = [
    { icon: <MdAddPhotoAlternate />, name: "Add photo of the day" },
    { icon: <MdAnalytics />, name: "Add analytical material post" },
    { icon: <MdOutlineQuestionAnswer />, name: "Add war history post" },
    { icon: <MdOutlineLanguage />, name: "Add world about Ukraine post" },
    { icon: <MdVideoCameraFront />, name: "Add leader interview post" },
  ];
  const logout = async () => {
    await signOut(auth);
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  useEffect(() => {
    if (user == null) {
      navigate("/admin");
    }
  }, [user]);

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <AppBar position="static">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" component="div">
              VICTORY CHRONICLES: Administration panel
            </Typography>
            <div>
              <Button
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Typography>Maria Banias</Typography>
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => logout()}>Log out</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="War stories" {...a11yProps(0)} />
            <Tab label="Leaders interviews" {...a11yProps(1)} />
            <Tab label="Analytical Materials" {...a11yProps(2)} />
            <Tab label="World about Ukraine" {...a11yProps(3)} />
            <Tab label="Photos of day" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box sx={{ height: "70vh" }}>War stories</Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Leaders interviews
        </TabPanel>
        <TabPanel value={value} index={2}>
          Analytical Materials
        </TabPanel>
        <TabPanel value={value} index={3}>
          World about Ukraine
        </TabPanel>
        <TabPanel value={value} index={4}>
          Photos of day
        </TabPanel>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 50, right: 50 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </Box>
    </ThemeProvider>
  );
};

export default AdminPanel;
