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
import { styled } from "@mui/material/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import theme from "../../utils/theme";

interface Props {
  modalIsOpen: boolean;
  setModalIsOpen(isOpen: boolean): void;

  recordValuesObj: {
    id: string;
    title: string;
    date: Date;
    source: string;
    sourceUrl: string;
    imageUrl: string;
    lead: string;
  };

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

const WorldAboutUkraineEditModal = (props: Props) => {
  const [title, setTitle] = useState<string>(props.recordValuesObj.title);
  const [dateSelected, setDateSelected] = useState<Date | any>(
    props.recordValuesObj.date
  );
  const [source, setSource] = useState<string>(props.recordValuesObj.source);
  const [sourceUrl, setSourceUrl] = useState<string>(
    props.recordValuesObj.sourceUrl
  );
  const [imageUrl, setImageUrl] = useState<string>(
    props.recordValuesObj.imageUrl
  );
  const [lead, setLead] = useState<string>(props.recordValuesObj.lead);

  useEffect(() => {
    setTitle(props.recordValuesObj.title);
    setDateSelected(props.recordValuesObj.date);
    setSource(props.recordValuesObj.source);
    setSourceUrl(props.recordValuesObj.sourceUrl);
    setImageUrl(props.recordValuesObj.imageUrl);
    setLead(props.recordValuesObj.lead);
  }, [props.recordValuesObj]);

  const [file, setFile] = useState<File | any>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileAdd = (event: any) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const deleteWorldAboutUkraineRecord = async () => {
    await deleteDoc(
      doc(
        firestore,
        CollectionNames.WORLD_ABOUT_UKRAINE,
        props.recordValuesObj.id
      )
    );
    props.setModalIsOpen(false);
    props.getRecordsFunction();
  };

  const editWorldAboutUkraineRecord = async () => {
    try {
      let worldAboutUkraineToEdit: {
        title: string;
        date: Timestamp;
        source: string;
        sourceUrl: string;
        imageUrl: string;
        lead: string;
      };

      if (!file) {
        worldAboutUkraineToEdit = {
          title: title,
          date: Timestamp.fromDate(dateSelected),
          source: source,
          sourceUrl: sourceUrl,
          imageUrl: imageUrl,
          lead: lead
        };
      } else {
        const storageRef = ref(
          storage,
          `/worldAboutUkraine/${Date.now()}${fileName}`
        );
        await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(storageRef);

        worldAboutUkraineToEdit = {
          title: title,
          date: Timestamp.fromDate(dateSelected),
          source: source,
          sourceUrl: sourceUrl,
          imageUrl: downloadUrl,
          lead: lead
        };
        
      }

      const worldAboutUkraineEditRef = doc(firestore, CollectionNames.WORLD_ABOUT_UKRAINE, props.recordValuesObj.id);
      await updateDoc(worldAboutUkraineEditRef, worldAboutUkraineToEdit);

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
              Edit Art During War post
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
                  onChange={(event) => setTitle(event.target.value)}
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
                  onChange={(event) => setSource(event.target.value)}
                />
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
                  label="Source URL"
                  variant="outlined"
                  value={sourceUrl}
                  onChange={(event) => setSourceUrl(event.target.value)}
                />
              <TextField
                sx={{ width: "100%" }}
                multiline
                maxRows={3}
                label="Lead"
                variant="outlined"
                value={lead}
                onChange={(event) => setLead(event.target.value)}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", width: "30%" }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    editWorldAboutUkraineRecord();
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
                onClick={() => deleteWorldAboutUkraineRecord()}
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

export default WorldAboutUkraineEditModal;
