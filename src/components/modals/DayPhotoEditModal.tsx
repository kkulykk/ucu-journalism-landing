import { useState, useEffect } from "react";

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

  recordValuesObj: {id: string, imageUrl: string, date: Date, source: string, description: string}
}

const DayPhotoEditModal = (props: Props) => {
  const [imageUrl, setImageUrl] = useState<string>(props.recordValuesObj.imageUrl)
  const [dateSelected, setDateSelected] = useState<Date | null>(props.recordValuesObj.date);
  const [source, setSource] = useState<string>(props.recordValuesObj.source)
  const [description, setDescription] = useState<string>(props.recordValuesObj.description)

  useEffect(() => {
    setImageUrl(props.recordValuesObj.imageUrl)
    setDateSelected(props.recordValuesObj.date)
    setSource(props.recordValuesObj.source)
    setDescription(props.recordValuesObj.description)
  }, [props.recordValuesObj])


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
                  label="Image URL"
                  variant="outlined"
                  value={imageUrl}
                  onChange={(event) => setImageUrl(event.target.value)}
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
                label="Source"
                multiline
                maxRows={2}
                variant="outlined"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <Typography variant="h3" sx={{ marginBottom: 1 }}>
                ADD IMAGE URL STRING AND THINK ABOUT EDITING IMAGE
              </Typography>
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <Button variant="outlined" component="span">
                  Upload image
                </Button>
              </label>
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

export default DayPhotoEditModal;
