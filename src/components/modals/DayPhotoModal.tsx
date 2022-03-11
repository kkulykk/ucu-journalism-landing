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
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { styled } from "@mui/material/styles";
import theme from "../../utils/theme";

const Input = styled("input")({
  display: "none",
});

interface Props {
  modalIsOpen: boolean;
  setModalIsOpen(isOpen: boolean): void;
  setSnackBarIsOpen(isOpen: boolean): void;
  triggerTableReloadAfterAdd(time: Date): void;
}

const DayPhotoModal = (props: Props) => {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<Date | any>(new Date());
  const [source, setSource] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [file, setFile] = useState<File | any>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileAdd = (event: any) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const addDayPhoto = async () => {
    const storageRef = ref(storage, `/dayPhotos/${Date.now()}${fileName}`);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);

    const dayPhotoToAdd: {
      imageUrl: string;
      date: Timestamp;
      source: string;
      description: string;
    } = {
      imageUrl: downloadUrl,
      date: Timestamp.fromDate(date),
      source: source,
      description: description,
    };

    const docRef = await addDoc(
      collection(firestore, CollectionNames.DAY_PHOTOS),
      dayPhotoToAdd
    );

    setTitle("");
    setDate(new Date());
    setSource("");
    setDescription("");

    setFile(null);
    setFileName("");

    props.triggerTableReloadAfterAdd(new Date());
  };

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
              Add new Photo Of The Day
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
                label="Source"
                multiline
                maxRows={2}
                variant="outlined"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
              <TextField
                label="Description"
                multiline
                maxRows={2}
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <TextField
                    sx={{ width: "100%" }}
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
              </Box>
            </Box>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                addDayPhoto();
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

export default DayPhotoModal;
