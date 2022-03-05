import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const SkeletonNews = () => {
  return (
    <Stack spacing={5}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Skeleton variant="rectangular" width={"20vw"} height={200} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Box>
            <Skeleton variant="text" height={40} width={"35vw"} />
            <Skeleton variant="text" height={40} width={"10vw"} />
          </Box>
          <Skeleton variant="text" height={10} width={"15vw"} />
          <Box>
            <Skeleton variant="text" height={15} width={"35vw"} />

            <Skeleton variant="text" height={15} width={"35vw"} />
            <Skeleton variant="text" height={15} width={"35vw"} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Skeleton variant="rectangular" width={"20vw"} height={200} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Box>
            <Skeleton variant="text" height={40} width={"35vw"} />
            <Skeleton variant="text" height={40} width={"10vw"} />
          </Box>
          <Skeleton variant="text" height={10} width={"15vw"} />
          <Box>
            <Skeleton variant="text" height={15} width={"35vw"} />

            <Skeleton variant="text" height={15} width={"35vw"} />
            <Skeleton variant="text" height={15} width={"35vw"} />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default SkeletonNews;
