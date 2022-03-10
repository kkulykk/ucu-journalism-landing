import { useState } from "react";

import { firestore } from "../../utils/firebaseConfig";
import { Timestamp, collection, addDoc } from "@firebase/firestore";

import { CollectionNames } from "../../services/firebase/firestore";

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
  title: string;
  modalIsOpen: boolean;
  setModalIsOpen(isOpen: boolean): void;
  setSnackBarIsOpen(isOpen: boolean): void;
  modalType?: CollectionNames;
}

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

const WarHistoryLeaderInterviewModal = (props: Props) => {
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<Date | any>(new Date());
  const [videoUrl, setVideoUrl] = useState<string>('');

  const addWarHistoryLeaderInterview = async () => {
    const warHistoryLeaderInterviewToAdd: {title: string, date: Timestamp, videoUrl: string} = {
      title: title,
      date: Timestamp.fromDate(date),
      videoUrl: videoUrl
    }

    // rewrite it without if, just by passing props.modalType in collection(firestore, %THERE%)
    if (props.modalType === CollectionNames.LEADER_INTERVIEWS) {
      const docRef = await addDoc(collection(firestore, CollectionNames.LEADER_INTERVIEWS), warHistoryLeaderInterviewToAdd);
    }

    if (props.modalType === CollectionNames.WAR_HISTORY) {
      const docRef = await addDoc(collection(firestore, CollectionNames.WAR_HISTORY), warHistoryLeaderInterviewToAdd);
    }

    setTitle('');
    setDate(new Date());
    setVideoUrl('');
  }


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
              Add new {props.title} post
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
                <TextField
                  sx={{ width: "100%" }}
                  label="Title"
                  variant="outlined"
                  value={title}         
                  onChange={(e) => setTitle(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date"
                    value={date}
                    onChange={(newDate) => {
                      setDate(newDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <TextField
                label="Video URL"
                variant="outlined"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </Box>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                addWarHistoryLeaderInterview();
                props.setModalIsOpen(false);
                props.setSnackBarIsOpen(true);
              }}
            >
              Add post
            </Button>
            <Button
              color="secondary"
              sx={{ marginLeft: "2%" }}
              onClick={() => {
                props.setModalIsOpen(false);
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

export default WarHistoryLeaderInterviewModal;
