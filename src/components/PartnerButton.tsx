import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material";

import theme from "../utils/theme";

export interface Props {
  title: string;
  link: string;
}

const SectionButton = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Button
        color="primary"
        variant="outlined"
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          flexDirection: "column",
          height: 80,
          width: "auto",
          "@media (max-width: 600px)": {
            width: 280,
          },
          m: 1.5,
        }}
        href={props.link}
        target="_blank"
      >
        <Typography variant="h3">{props.title}</Typography>
      </Button>
    </ThemeProvider>
  );
};

export default SectionButton;
