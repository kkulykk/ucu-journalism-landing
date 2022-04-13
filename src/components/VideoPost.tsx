import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export interface Props {
  title: string;
  date: string;
  videoUrl: string;
}

const VideoPost = (props: Props) => {
  return (
    <Card
      sx={{
        width: "100%",
        minWidth: 250,
        maxWidth: 550,
        m: 3,
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        textAlign: "left",
      }}
    >
      <CardMedia
        component="iframe"
        sx={{ aspectRatio: "16 /9" }}
        allowFullScreen
        frameBorder="0"
        image={props.videoUrl}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          height: "25%",
          gap: 0,
        }}
      >
        <Typography
          variant="caption"
          color="secondary.main"
          sx={{ marginBottom: 0.5 }}
        >
          {props.date}
        </Typography>
        <Typography variant="h4" sx={{ marginBottom: 1 }}>
          {props.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoPost;
