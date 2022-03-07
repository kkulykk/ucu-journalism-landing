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
        aspectRatio: "16/9",
        width: 550,
        minWidth: 300,
        m: 3,
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        textAlign: "left",
      }}
    >
      <CardMedia
        component="iframe"
        height="70%"
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
          sx={{ marginBottom: 1 }}
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