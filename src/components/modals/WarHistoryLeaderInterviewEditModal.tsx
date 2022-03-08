import { useState } from "react";

import { ThemeProvider } from "@mui/material";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import theme from "../../utils/theme";

interface Props {
  modalHeading: string;
  modalIsOpen: boolean;
  setModalIsOpen(isOpen: boolean): void;

  title: string;
  videoUrl: string;
  date: Date;
}

const WarHistoryLeaderInterviewEditModal = (props: Props) => {
  const [title, setTitle] = useState<string>(props.title);
  const [videoUrl, setVideoUrl] = useState<string>(props.videoUrl);
  const [dateSelected, setDateSelected] = useState<Date | null>(props.date);

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

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={props.modalIsOpen}
        onClose={() => props.setModalIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ p: 5, overflow: "scroll" }}>
            <Typography variant="h3" sx={{ marginBottom: 1 }}>
              Edit {props.modalHeading}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                m: "5% 0",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <Typography variant="h3" sx={{ marginBottom: 1 }}>
                  {props.title}
                </Typography>
                <TextField
                  sx={{ width: "100%" }}
                  label="Title"
                  variant="outlined"
                  // value={title}
                  defaultValue={props.title}
                  onChange={(event) => console.log(event.target.value)}
                />
                {/* <Typography variant="h3" sx={{ marginBottom: 1 }}>
                  {props.date.toISOString()}
                </Typography> */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date"
                    value={dateSelected}
                    onChange={(newValue) => {
                      setDateSelected(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Typography variant="h3" sx={{ marginBottom: 1 }}>
                {props.videoUrl}
              </Typography>
              <TextField
                label="Video URL"
                variant="outlined"
                value={videoUrl}
              />
            </Box>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                props.setModalIsOpen(false);
              }}
            >
              Add post
            </Button>
            <Button
              color="secondary"
              sx={{ marginLeft: "2%" }}
              onClick={() => {
                props.setModalIsOpen(false);
                console.log("CLOSE");
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default WarHistoryLeaderInterviewEditModal;
