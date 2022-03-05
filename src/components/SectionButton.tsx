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
        color="info"
        variant="contained"
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          flexDirection: "column",
          height: 200,
          maxWidth: 350,
          minWidth: 250,
          m: 3,
        }}
        href={props.link}
      >
        {props.title}
        <Typography variant="body1">{props.desc}</Typography>
      </Button>
    </ThemeProvider>
  );
};

export default SectionButton;
