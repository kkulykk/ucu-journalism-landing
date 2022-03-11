import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";

export interface Props {
  title: string;
  desc: string;
}

const SectionDescription = (props: Props) => {
  return (
    <Box
      height={"35vh"}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "Center",
      }}
    >
      <Typography
        variant="h2"
        color={"primary.main"}
        sx={{ marginBottom: "1vh" }}
      >
        {props.title}
      </Typography>
      <Typography variant="h5" width={"60vw"} color={"secondary.main"}>
        {props.desc}
      </Typography>
    </Box>
  );
};

export default SectionDescription;
