import { useState, useEffect } from "react";
import {
  getFirestoreRecords,
  CollectionNames,
} from "../services/firebase/firestore";
import { AnalyticalMaterialsObj } from "../services/models/firestoreDocuments";
import { ThemeProvider } from "@mui/material";
import theme from "../utils/theme";
import Header from "../components/Header";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArticleBox from "../components/ArticleBox";
import Footer from "../components/Footer";

const AnalyticalMaterials = () => {
  const [analyticalMaterialObjects, setAnalyticalMaterialObjects] = useState<
    AnalyticalMaterialsObj[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAnalyticalMaterialPosts = async () => {
    const postsArray: AnalyticalMaterialsObj[] = [];
    try {
      setIsLoading(true); // switch ON page loader
      const posts = await getFirestoreRecords(
        CollectionNames.ANALYTICS_MATERIAL
      );

      posts.forEach((doc) => {
        const docData = doc.data();
        const singleAnalyticalMaterialPost: AnalyticalMaterialsObj =
          new AnalyticalMaterialsObj(
            docData.title,
            docData.date,
            docData.source,
            docData.imageUrl,
            docData.lead,
            docData.text
          );
        postsArray.push(singleAnalyticalMaterialPost);
      });

      setAnalyticalMaterialObjects(postsArray);

      setIsLoading(false); // switch OFF page loader
    } catch (err) {
      console.error(err);
    }
  };

  const Placeholder = () => {
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

  const mappedArticleBoxes = (): JSX.Element[] => {
    return analyticalMaterialObjects.map((post, index) => {
      return (
        <ArticleBox
          key={index}
          title={post.title}
          date={post.date}
          source={post.source}
          imageUrl={post.imageUrl}
          lead={post.lead}
          text={post.text}
        />
      );
    });
  };

  useEffect(() => {
    getAnalyticalMaterialPosts();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
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
            Analytical Materials
          </Typography>
          <Typography variant="h5" width={"60vw"} color={"secondary.main"}>
            Here we describe the objectivs of the project and tell readers what
            we mainly post here. There is also small description of all the
            authors and so on
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {isLoading ? Placeholder() : mappedArticleBoxes()}
        </Box>
      </div>
      <Button disabled={isLoading} variant="outlined" sx={{ marginTop: 5 }}>
        Load more
      </Button>
      <Footer />
    </ThemeProvider>
  );
};

export default AnalyticalMaterials;
