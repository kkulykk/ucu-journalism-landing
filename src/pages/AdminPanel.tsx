import { useState, useEffect, SyntheticEvent } from "react";
import { ThemeProvider } from "@mui/material";
import { fetchAdminName } from "../services/firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebaseConfig";
import { signOut } from "@firebase/auth";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuthState } from "react-firebase-hooks/auth";
import Snackbar from "@mui/material/Snackbar";
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
import {
  MdAddPhotoAlternate,
  MdVideoCameraFront,
  MdOutlineLanguage,
  MdOutlineQuestionAnswer,
  MdAnalytics,
  MdLink,
} from "react-icons/md";
import theme from "../utils/theme";

import { CollectionNames } from "../services/firebase/firestore";

// Tables imports
import WarHistoryTable from "../components/adminPanelTables/WarHistoryTable";
import LeaderInterviewsTable from "../components/adminPanelTables/LeaderInterviewsTable";
import AnalyticalMaterialsTable from "../components/adminPanelTables/AnalyticalMaterialsTable";
import WorldAboutUkraineTable from "../components/adminPanelTables/WorldAboutUkraineTable";
import DayPhotosTable from "../components/adminPanelTables/DayPhotosTable";
import WorldSupportTable from "../components/adminPanelTables/WorldSupportTable";


import DayPhotoModal from "../components/modals/DayPhotoModal";
import AnalyticalMaterialModal from "../components/modals/AnalyticalMaterialModal";
import WarHistoryLeaderInterviewModal from "../components/modals/WarHistoryLeaderInterviewModal";
import WorldAboutUkraineModal from "../components/modals/WorldAboutUkraineModal";
import WorldSuportModal from '../components/modals/WorldSupportModal';


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

  const [adminName, setAdminName] = useState<string | undefined>("");

  const [user, loading, error] = useAuthState(auth);

  const [openDayPhotoModal, setOpenDayPhotoModal] = useState<boolean>(false);
  const [openAnalyticalMaterialModal, setOpenAnalyticalMaterialModal] =
    useState<boolean>(false);
  const [openWarHistoryModal, setOpenWarHistoryModal] =
    useState<boolean>(false);
  const [openWorldAboutUkraineModal, setOpenWorldAboutUkraineModal] =
    useState<boolean>(false);
  const [openLeaderInterviewModal, setOpenLeaderInterviewModal] =
    useState<boolean>(false);
  const [openWorldSupport, setOpenWorldSupport] =
    useState<boolean>(false);

  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const [newAddedTime, setNewAddedTime] = useState<Date>(new Date());
  const actions = [
    {
      icon: <MdAddPhotoAlternate size={20} />,
      name: "Add photo of the day",
      onClick: () => setOpenDayPhotoModal(true),
    },
    {
      icon: <MdAnalytics size={20} />,
      name: "Add Ukraine and Global Agenda post",
      onClick: () => setOpenAnalyticalMaterialModal(true),
    },
    {
      icon: <MdOutlineQuestionAnswer size={20} />,
      name: "Add Resilience Story post",
      onClick: () => setOpenWarHistoryModal(true),
    },
    {
      icon: <MdOutlineLanguage size={20} />,
      name: "Add Art During War post",
      onClick: () => setOpenWorldAboutUkraineModal(true),
    },
    {
      icon: <MdVideoCameraFront size={20} />,
      name: "Add Opinion Leader Interview post",
      onClick: () => setOpenLeaderInterviewModal(true),
    },
    {
      icon: <MdVideoCameraFront size={20} />,
      name: "Add world support post",
      onClick: () => setOpenWorldSupport(true),
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

  const getAdminName = async () => {
    try {
      const userName = await fetchAdminName(user?.uid);
      const data = userName.docs[0].data();
      setAdminName(data.name);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      navigate("/admin");
    }
    getAdminName();
  }, [user, loading]);

  if (loading)
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  return (
    <ThemeProvider theme={theme}>
      <DayPhotoModal
        modalIsOpen={openDayPhotoModal}
        setModalIsOpen={setOpenDayPhotoModal}
        setSnackBarIsOpen={setOpenSnackBar}
        triggerTableReloadAfterAdd={setNewAddedTime}
      />
      <AnalyticalMaterialModal
        modalIsOpen={openAnalyticalMaterialModal}
        setModalIsOpen={setOpenAnalyticalMaterialModal}
        setSnackBarIsOpen={setOpenSnackBar}
        triggerTableReloadAfterAdd={setNewAddedTime}
      />
      <WarHistoryLeaderInterviewModal
        title="Resilience Story"
        modalIsOpen={openWarHistoryModal}
        setModalIsOpen={setOpenWarHistoryModal}
        setSnackBarIsOpen={setOpenSnackBar}
        modalType={CollectionNames.WAR_HISTORY}
        triggerTableReloadAfterAdd={setNewAddedTime}
      />
      <WarHistoryLeaderInterviewModal
        title="Opinion Leader Interview"
        modalIsOpen={openLeaderInterviewModal}
        setModalIsOpen={setOpenLeaderInterviewModal}
        setSnackBarIsOpen={setOpenSnackBar}
        modalType={CollectionNames.LEADER_INTERVIEWS}
        triggerTableReloadAfterAdd={setNewAddedTime}
      />
      <WorldAboutUkraineModal
        modalIsOpen={openWorldAboutUkraineModal}
        setModalIsOpen={setOpenWorldAboutUkraineModal}
        setSnackBarIsOpen={setOpenSnackBar}
        triggerTableReloadAfterAdd={setNewAddedTime}
      />
       <WorldSuportModal
        modalIsOpen={openWorldSupport}
        setModalIsOpen={setOpenWorldSupport}
        setSnackBarIsOpen={setOpenSnackBar}
        triggerTableReloadAfterAdd={setNewAddedTime}
      />
      
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackBar(false)}
        message="New post added"
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
                <Typography>{adminName}</Typography>
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
            {/* <p>{value}</p> */}
            <Tab label="Resilience Stories" {...a11yProps(0)} />
            <Tab label="Opinion Leaders Interviews" {...a11yProps(1)} />
            <Tab label="Ukraine and Global Agenda" {...a11yProps(2)} />
            <Tab label="Art During War" {...a11yProps(3)} />
            <Tab label="Photos of day" {...a11yProps(4)} />
            <Tab label="Support from the World" {...a11yProps(5)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="h4" sx={{ marginBottom: 1 }}>
              Resilience Stories posts
            </Typography>

            <Link color="primary" target={"_blank"} to="/stories">
              <MdLink size={25} color="#7f1716" />
            </Link>
          </Box>
          <Box>
            {/* TABLE */}
            <WarHistoryTable lastTimeNewAdded={newAddedTime} />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="h4" sx={{ marginBottom: 1 }}>
              Opinion Leaders Interviews posts
            </Typography>
            <Link target={"_blank"} to="/leaders">
              <MdLink size={25} color="#7f1716" />
            </Link>
          </Box>
          <Box>
            {/* TABLE */}
            <LeaderInterviewsTable lastTimeNewAdded={newAddedTime} />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="h4" sx={{ marginBottom: 1 }}>
              Ukraine and Global Agenda posts
            </Typography>
            <Link target={"_blank"} to="/global">
              <MdLink size={25} color="#7f1716" />
            </Link>
          </Box>
          <Box>
            {/* TABLE */}
            <AnalyticalMaterialsTable lastTimeNewAdded={newAddedTime} />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="h4" sx={{ marginBottom: 1 }}>
              Art During War posts
            </Typography>
            <Link target={"_blank"} to="/art">
              <MdLink size={25} color="#7f1716" />
            </Link>
          </Box>
          <Box>
            {/* TABLE */}
            <WorldAboutUkraineTable lastTimeNewAdded={newAddedTime} />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Typography variant="h4" sx={{ marginBottom: 1 }}>
            Photos of day
          </Typography>
          <Box>
            {/* TABLE */}
            <DayPhotosTable lastTimeNewAdded={newAddedTime} />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="h4" sx={{ marginBottom: 1 }}>
              Support from the world posts
            </Typography>
            <Link target={"_blank"} to="/world_support">
              <MdLink size={25} color="#7f1716" />
            </Link>
          </Box>
          <Box>
            {/* TABLE */}
            <WorldSupportTable lastTimeNewAdded={newAddedTime} />
          </Box>
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
