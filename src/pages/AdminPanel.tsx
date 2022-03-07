import { useState, useEffect, SetStateAction, SyntheticEvent } from "react";
import { ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { auth } from "../utils/firebaseConfig";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
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
import { styled } from "@mui/material/styles";

import theme from "../utils/theme";

import DayPhotoModal from "../components/modals/DayPhotoModal";
import AnalyticalMaterialModal from "../components/modals/AnalyticalMaterialModal";
import WarHistoryLeaderInterviewModal from "../components/modals/WarHistoryLeaderInterviewModal";
import WorldAboutUkraineModal from "../components/modals/WorldAboutUkraineModal";

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
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60vw",
    maxHeight: "90vh",
    bgcolor: "white",
    overflow: "scroll",
    borderRadius: 3,
    boxShadow: 24,
  };

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<{} | null>({});

  const [openDayPhotoModal, setOpenDayPhotoModal] = useState<boolean>(false);
  const [openAnalyticalMaterialModal, setOpenAnalyticalMaterialModal] =
    useState<boolean>(false);
  const [openWarHistoryModal, setOpenWarHistoryModal] =
    useState<boolean>(false);
  const [openWorldAboutUkraineModal, setOpenWorldAboutUkraineModal] =
    useState<boolean>(false);
  const [openLeaderInterviewModal, setOpenLeaderInterviewModal] =
    useState<boolean>(false);

  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const actions = [
    {
      icon: <MdAddPhotoAlternate />,
      name: "Add photo of the day",
      onClick: () => setOpenDayPhotoModal(true),
    },
    {
      icon: <MdAnalytics />,
      name: "Add analytical material post",
      onClick: () => setOpenAnalyticalMaterialModal(true),
    },
    {
      icon: <MdOutlineQuestionAnswer />,
      name: "Add war history post",
      onClick: () => setOpenWarHistoryModal(true),
    },
    {
      icon: <MdOutlineLanguage />,
      name: "Add world about Ukraine post",
      onClick: () => setOpenWorldAboutUkraineModal(true),
    },
    {
      icon: <MdVideoCameraFront />,
      name: "Add leader interview post",
      onClick: () => setOpenLeaderInterviewModal(true),
    },
  ];

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
  };

  // Authentication part
  const logout = async () => {
    await signOut(auth);
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  useEffect(() => {
    if (!auth.currentUser) {
      // user is NOT logged in
      navigate("/admin");
    }
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <DayPhotoModal
        modalIsOpen={openDayPhotoModal}
        setModalIsOpen={setOpenDayPhotoModal}
        setSnackBarIsOpen={setOpenSnackBar}
      />
      <AnalyticalMaterialModal
        modalIsOpen={openAnalyticalMaterialModal}
        setModalIsOpen={setOpenAnalyticalMaterialModal}
        setSnackBarIsOpen={setOpenSnackBar}
      />
      <WarHistoryLeaderInterviewModal
        title="War History"
        modalIsOpen={openWarHistoryModal}
        setModalIsOpen={setOpenWarHistoryModal}
        setSnackBarIsOpen={setOpenSnackBar}
      />
      <WarHistoryLeaderInterviewModal
        title="Leader Interview"
        modalIsOpen={openLeaderInterviewModal}
        setModalIsOpen={setOpenLeaderInterviewModal}
        setSnackBarIsOpen={setOpenSnackBar}
      />
      <WorldAboutUkraineModal
        modalIsOpen={openWorldAboutUkraineModal}
        setModalIsOpen={setOpenWorldAboutUkraineModal}
        setSnackBarIsOpen={setOpenSnackBar}
      />
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackBar(false)}
        message="New item added"
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <AppBar position="static">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" component="div">
              VICTORY CHRONICLES: Administration panel
            </Typography>
            <div>
              <Button
                onClick={() => navigate("/")}
                size="small"
                sx={{ marginRight: 2 }}
                color="inherit"
              >
                <Typography variant="caption">To website</Typography>
              </Button>
              <Button
                variant="outlined"
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
              onClick={action.onClick}
            />
          ))}
        </SpeedDial>
      </Box>
    </ThemeProvider>
  );
};

export default AdminPanel;
