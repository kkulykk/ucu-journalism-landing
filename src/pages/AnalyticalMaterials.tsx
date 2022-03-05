import { useState, useEffect } from "react";
import {
  getFirestoreRecords,
  CollectionNames,
} from "../services/firebase/firestore";
import { AnalyticalMaterialsObj } from "../services/models/firestoreDocuments";
import { ThemeProvider } from "@mui/material";
import theme from "../utils/theme";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArticleBox from "../components/ArticleBox";
import Footer from "../components/Footer";
import SectionDescription from "../components/SectionDescription";
import SkeletonNews from "../components/SkeletonNews";

// Constants
const POSTS_NUMBER = 1

const AnalyticalMaterials = () => {
  const [analyticalMaterialObjects, setAnalyticalMaterialObjects] = useState<AnalyticalMaterialsObj[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postsNumber, setPostsNumber] = useState<number>(POSTS_NUMBER)

  const getAnalyticalMaterialPosts = async () => {
    const postObjectsArray: AnalyticalMaterialsObj[] = [];
    try {
      setIsLoading(true); // switch ON page loader
      const posts = await getFirestoreRecords(
        CollectionNames.ANALYTICS_MATERIAL,
        postsNumber
      );

      posts.forEach((doc) => {
        const docData = doc.data();
        const singleAnalyticalMaterialObject: AnalyticalMaterialsObj =
          new AnalyticalMaterialsObj(
            docData.title,
            docData.date,
            docData.source,
            docData.imageUrl,
            docData.lead,
            docData.text
          );
        postObjectsArray.push(singleAnalyticalMaterialObject);
      });

      setAnalyticalMaterialObjects(postObjectsArray);

      setIsLoading(false); // switch OFF page loader
    } catch (err) {
      console.error(err);
    }
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
  }, [postsNumber]);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />

        <SectionDescription
          title="Analytical Materials"
          desc="Here we describe the objectivs of the project and tell readers what we
        mainly post here. There is also small description of all the authors and
        so on"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {isLoading ? SkeletonNews() : mappedArticleBoxes()}
        </Box>
      </div>
      <Button disabled={isLoading} variant="outlined" sx={{ marginTop: 5 }} onClick={() => setPostsNumber(postsNumber + POSTS_NUMBER)}>
        Load more
      </Button>
      <Footer />
    </ThemeProvider>
  );
};

export default AnalyticalMaterials;
