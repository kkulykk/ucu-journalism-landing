import { useState } from "react";

import { firestore, storage } from "../../utils/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Timestamp, collection, addDoc } from "@firebase/firestore";

import { CollectionNames } from "../../services/firebase/firestore";

import { ThemeProvider } from "@mui/material";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import theme from "../../utils/theme";

interface Props {
  modalIsOpen: boolean;
  setModalIsOpen(isOpen: boolean): void;
  setSnackBarIsOpen(isOpen: boolean): void;
}

const Input = styled("input")({
  display: "none",
});

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

const AnalyticalMaterialModal = (props: Props) => {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<Date | any>(new Date());
  const [source, setSource] = useState<string>("");
  const [lead, setLead] = useState<string>("");
  const [text, setText] = useState<string>("");

  const [file, setFile] = useState<File | any>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileAdd = (event: any) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const addAnalyticalMaterial = async () => {
    const storageRef = ref(
      storage,
      `/analyticalMaterial/${Date.now()}${fileName}`
    );
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);

    const analyticalMaterialToAdd: {
      title: string;
      date: Timestamp;
      source: string;
      imageUrl: string;
      lead: string;
      text: string;
    } = {
      title: title,
      date: Timestamp.fromDate(date),
      source: source,
      imageUrl: downloadUrl,
      lead: lead,
      text: text,
    };

    const docRef = await addDoc(
      collection(firestore, CollectionNames.ANALYTICS_MATERIAL),
      analyticalMaterialToAdd
    );

    setTitle("");
    setDate(new Date());
    setSource("");
    setLead("");
    setText("");

    setFile(null);
    setFileName("");
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
              Add new Ukraine and Global Agenda post
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
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <TextField
                  sx={{ width: "100%" }}
                  label="Source"
                  variant="outlined"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
                <TextField
                  label="File Name"
                  multiline
                  maxRows={2}
                  variant="outlined"
                  value={fileName}
                />
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => handleFileAdd(e)}
                  />
                  <Button
                    sx={{ width: 130 }}
                    variant="outlined"
                    component="span"
                  >
                    Upload image
                  </Button>
                </label>
              </Box>
              <TextField
                sx={{ width: "100%" }}
                multiline
                maxRows={3}
                label="Lead"
                variant="outlined"
                value={lead}
                onChange={(e) => setLead(e.target.value)}
              />
              <TextField
                multiline
                maxRows={5}
                sx={{ width: "100%" }}
                label="Text"
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Box>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                addAnalyticalMaterial();
                props.setModalIsOpen(false);
                props.setSnackBarIsOpen(true);
              }}
            >
              Add post
            </Button>
            <Button
              color="secondary"
              sx={{ marginLeft: "2%" }}
              onClick={() => props.setModalIsOpen(false)}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default AnalyticalMaterialModal;
