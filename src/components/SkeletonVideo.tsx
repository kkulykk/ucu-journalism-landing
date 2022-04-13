import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const SkeletonVideo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        p: "0 8%",
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{
          aspectRatio: "16/9",
          width: 450,
          minWidth: 300,
          height: 270,
          borderRadius: 1,
          m: 3,
        }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          aspectRatio: "16/9",
          width: 450,
          minWidth: 300,
          height: 270,
          borderRadius: 1,
          m: 3,
        }}
      />
    </Box>
  );
};

export default SkeletonVideo;
