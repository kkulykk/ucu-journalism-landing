import { useState, useEffect, SetStateAction, SyntheticEvent } from "react";
import { ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
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

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleLogout = (): void => {
    localStorage.removeItem("adminId");
    navigate("/admin");
  };

  const actions = [
    { icon: <MdAddPhotoAlternate />, name: "Add photo of the day" },
    { icon: <MdAnalytics />, name: "Add analytical material post" },
    { icon: <MdOutlineQuestionAnswer />, name: "Add war history post" },
    { icon: <MdOutlineLanguage />, name: "Add world about Ukraine post" },
    { icon: <MdVideoCameraFront />, name: "Add leader interview post" },
  ];

  useEffect(() => {
    if (!localStorage.getItem("adminId")) {
      navigate("/admin");
    }
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

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
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
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
          <Box sx={{ height: "70vh" }}>
            War stories
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            </div>
          </Box>
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
