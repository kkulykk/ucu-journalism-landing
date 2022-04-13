import { useState, useEffect } from "react";

import { firestore, storage } from "../../utils/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, deleteDoc, updateDoc, Timestamp } from "firebase/firestore";

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

interface Props {
  modalIsOpen: boolean;
  setModalIsOpen(isOpen: boolean): void;

  recordValuesObj: {id: string, imageUrl: string, date: Date, source: string, description: string};
  getRecordsFunction(): void;
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

const DayPhotoEditModal = (props: Props) => {
  const [imageUrl, setImageUrl] = useState<string>(props.recordValuesObj.imageUrl)
  const [dateSelected, setDateSelected] = useState<Date | any>(props.recordValuesObj.date);
  const [source, setSource] = useState<string>(props.recordValuesObj.source)
  const [description, setDescription] = useState<string>(props.recordValuesObj.description)

  useEffect(() => {
    setImageUrl(props.recordValuesObj.imageUrl)
    setDateSelected(props.recordValuesObj.date)
    setSource(props.recordValuesObj.source)
    setDescription(props.recordValuesObj.description)
  }, [props.recordValuesObj])

  const [file, setFile] = useState<File | any>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileAdd = (event: any) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const deleteDayPhotoRecord = async () => {
    await deleteDoc(doc(firestore, CollectionNames.DAY_PHOTOS, props.recordValuesObj.id));
    props.setModalIsOpen(false);
    props.getRecordsFunction();
  }

  const editDayPhotoRecord = async () => {
    try {
      let dayPhotoToEdit: {imageUrl: string, date: Timestamp, source: string, description: string};

      if (!file) {
        dayPhotoToEdit = {
          imageUrl: imageUrl,
          date: Timestamp.fromDate(dateSelected),
          source: source,
          description: description
        };

      } else {
        const storageRef = ref(
          storage,
          `/dayPhotos/${Date.now()}${fileName}`
        );
        await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(storageRef);

        dayPhotoToEdit = {
          imageUrl: downloadUrl,
          date: Timestamp.fromDate(dateSelected),
          source: source,
          description: description
        };
        
      }

      const dayPhotoEditRef = doc(firestore, CollectionNames.DAY_PHOTOS, props.recordValuesObj.id);
      await updateDoc(dayPhotoEditRef, dayPhotoToEdit);

      setFile(null);
      setFileName("");
      props.setModalIsOpen(false);
      props.getRecordsFunction();
    } catch (err) {
      console.error(err)
    }
  }



  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={props.modalIsOpen}
        onClose={() => {
          setFile(null);
          setFileName("");
          props.setModalIsOpen(false);
          }
        }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ p: 5, overflow: "scroll" }}>
            <Typography variant="h3" sx={{ marginBottom: 1 }}>
              Edit Photo Of The Day
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
                  label="Source"
                  multiline
                  maxRows={2}
                  variant="outlined"
                  value={source}
                  onChange={(event) => setSource(event.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date"
                    value={dateSelected}
                    onChange={(newDate) => {
                      setDateSelected(newDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>

              <TextField
                label="Description"
                multiline
                maxRows={2}
                variant="outlined"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <TextField
                  sx={{ width: 300 }}
                  label="File Name"
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
                  <Button variant="outlined" component="span">
                    Upload image
                  </Button>
                </label>
              </Box>
            </Box>
            <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between"}}>
              <Box sx={{ display: "flex", width: "30%" }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    editDayPhotoRecord();
                    props.setModalIsOpen(false);
                  }}
                  >
                  Edit post
                </Button>
                <Button
                  color="secondary"
                  sx={{ marginLeft: "2%" }}
                  onClick={() => {
                    setFile(null);
                    setFileName("");
                    props.setModalIsOpen(false);
                    }
                  }
                >
                  Close
                </Button>
              </Box>
              <Button
                color="secondary"
                sx={{ marginLeft: "2%" }}
                onClick={() => deleteDayPhotoRecord()}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default DayPhotoEditModal;
