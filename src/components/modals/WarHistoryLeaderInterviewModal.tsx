import { useState  } from "react";

import { ThemeProvider } from "@mui/material";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import theme from "../../utils/theme";


interface Props {
    title: string;
    modalIsOpen: boolean;
    setModalIsOpen(isOpen: boolean): void;
    setSnackBarIsOpen(isOpen: boolean): void;
  }

const WarHistoryLeaderInterviewModal = (props: Props) => {
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
              <TextField label="Title" variant="outlined" />
              <TextField label="Video URL" variant="outlined" />
              <Typography variant="h5" sx={{ marginBottom: 1 }}>
                ADD DATE SELECTION THERE
              </Typography>
            </Box>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
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
  </ ThemeProvider>

  )
}

export default WarHistoryLeaderInterviewModal