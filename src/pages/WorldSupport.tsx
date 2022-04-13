import { useState, useEffect } from "react";
import {
  getFirestoreRecordsLimit,
  CollectionNames,
} from "../services/firebase/firestore";
import { WorldSupportObj } from "../services/models/firestoreDocuments";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionDescription from "../components/SectionDescription";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material";
import theme from "../utils/theme";
import WorldArticle from "../components/WorldArticle";
import SkeletonNews from "../components/SkeletonNews";

// Constants
const POSTS_NUMBER = 5;

const WorldSupport = () => {
  const [worldSupportObjects, setWorldSupportObjects] = useState<
   WorldSupportObj[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postsNumber, setPostsNumber] = useState<number>(POSTS_NUMBER);

  const getWorldSupportPosts = async () => {
    const postObjects: WorldSupportObj[] = [];
    try {
      setIsLoading(true);
      const posts = await getFirestoreRecordsLimit(
        CollectionNames.WORLD_SUPPORT,
        postsNumber
      );
        console.log(posts)
      posts.forEach((doc) => {
        const docData = doc.data();
        const signleWorldSupportObject: WorldSupportObj =
          new WorldSupportObj(
            doc.id,
            docData.title,
            docData.date,
            docData.source,
            docData.sourceUrl,
            docData.imageUrl,
            docData.lead
          );
        postObjects.push(signleWorldSupportObject);
      });

      setWorldSupportObjects(postObjects);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const mappedWorldArticles = (): JSX.Element[] => {
    return worldSupportObjects.map((post, index) => {
      return (
        <WorldArticle
          key={index}
          title={post.title}
          date={post.date}
          source={post.source}
          sourceUrl={post.sourceUrl}
          imageUrl={post.imageUrl}
          lead={post.lead}
        />
      );
    });
  };

  useEffect(() => {
    getWorldSupportPosts();
  }, [postsNumber]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <SectionDescription title="SUPPORT FROM THE WORLD TO UKRAINE" desc="Support" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {isLoading ? <SkeletonNews /> : mappedWorldArticles()}
      </Box>
      <Button
        variant="outlined"
        sx={{ marginTop: 5 }}
        onClick={() => setPostsNumber(postsNumber + POSTS_NUMBER)}
      >
        Load more
      </Button>
      <Footer />
    </ThemeProvider>
  );
};

export default WorldSupport;
