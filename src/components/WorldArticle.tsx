import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material";
import { CardActionArea } from "@mui/material";
import theme from "../utils/theme";

export interface Props {
  title: string;
  date: string;
  source: string;
  lead: string;
  imageUrl: string;
  sourceUrl: string;
}

const WorldArticle = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          maxWidth: "60vw",
          boxShadow: 3,
          borderRadius: 3,
          m: 2,
        }}
      >
        <CardActionArea
          onClick={() => window.open(props.sourceUrl, "_blank")}
          sx={{ display: "flex" }}
        >
          <CardMedia
            sx={{ height: 200, width: "35%" }}
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
              height: 150,
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
                  width: "11rem",
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

export default WorldArticle;
