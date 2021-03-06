import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ThemeProvider } from "@mui/material";
import { CardActionArea } from "@mui/material";
import theme from "../utils/theme";

export interface Props {
  title: string;
  date: string;
  source: string;
  lead: string;
  text: string;
  imageUrl: string;
  sourceUrl: string;
}

const ArticleBox = (props: Props) => {
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
    "@media (max-width: 750px)": {
      width: "90vw",
    },
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src={props.imageUrl}
            style={{
              width: "100%",
              height: "30vh",
              objectFit: "cover",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
          />

          <Box sx={{ p: 5, overflow: "scroll" }}>
            <Typography variant="h3" sx={{ marginBottom: 1 }}>
              {props.title}
            </Typography>
            <Box
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
                display: "flex",
                gap: 2,
                color: "#607d8b",
                marginBottom: 2.5,
              }}
            >
              <Typography variant="caption">{props.source}</Typography>
              <Typography variant="caption">{props.date}</Typography>
            </Box>

            <Typography variant="body1">
              {props.text.split("_").map((i, key) => {
                return (
                  <div style={{ marginTop: "15px" }} key={key}>
                    {i}
                  </div>
                );
              })}
            </Typography>
          </Box>
          <Button
            color="secondary"
            sx={{ marginBottom: 2.5, left: "3%" }}
            onClick={handleClose}
          >
            Close
          </Button>
        </Box>
      </Modal>
      <Card
        sx={{
          maxWidth: "60vw",
          height: "auto",
          boxShadow: 3,
          borderRadius: 3,
          transition: "all ease-in-out 0.1s",
          "@media (max-width: 800px)": {
            maxWidth: "90vw",
          },
          m: 2,
        }}
      >
        <CardActionArea
          onClick={
            props.sourceUrl
              ? () => window.open(props.sourceUrl, "_blank")
              : handleOpen
          }
          sx={{ display: "flex" }}
        >
          <CardMedia
            sx={{ height: 250, width: "35%", objectFit: "cover" }}
            component="img"
            alt="green iguana"
            image={props.imageUrl}
          />

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              textAlign: "left",
              width: "65%",
              height: "auto",
            }}
          >
            <div>
              <Typography variant="h3" sx={{ marginBottom: 1 }}>
                {props.title}
              </Typography>
              <Box
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "auto",
                  display: "flex",
                  gap: 2,
                  color: "#607d8b",
                }}
              >
                <Typography variant="caption">{props.source}</Typography>
                <Typography variant="caption">{props.date}</Typography>
              </Box>
            </div>
            <Typography
              variant="body2"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                "-webkit-line-clamp": "3",
                "-webkit-box-orient": "vertical",
              }}
            >
              {props.lead}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </ThemeProvider>
  );
};

export default ArticleBox;
