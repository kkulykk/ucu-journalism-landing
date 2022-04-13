import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material";

import theme from "../utils/theme";

export interface Props {
  title: string;
  desc: string;
  link: string;
}

const SectionButton = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Button
        color="primary"
        variant="contained"
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          flexDirection: "column",
          height: 200,
          width: 300,
          m: 1.5,
        }}
        href={props.link}
      >
        <Typography variant="h3">{props.title}</Typography>
        <Typography variant="body2" sx={{ textTransform: "none" }}>
          {props.desc}
        </Typography>
      </Button>
    </ThemeProvider>
  );
};

export default SectionButton;
