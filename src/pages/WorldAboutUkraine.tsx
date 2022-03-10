import { useState, useEffect } from "react";
import {
  getFirestoreRecordsLimit,
  CollectionNames,
} from "../services/firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import { WorldAboutUkraineObj } from "../services/models/firestoreDocuments";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionDescription from "../components/SectionDescription";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material";
import theme from "../utils/theme";
import WorldArticle from "../components/WorldArticle";

// Constants
const POSTS_NUMBER = 5;

const WorldAboutUkraine = () => {
  const [worldAboutUkraineObjects, setWorldAboutUkraineObjects] = useState<
    WorldAboutUkraineObj[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postsNumber, setPostsNumber] = useState<number>(POSTS_NUMBER);

  const getWorldAboutUkrainePosts = async () => {
    const postObjects: WorldAboutUkraineObj[] = [];
    try {
      setIsLoading(true);
      const posts = await getFirestoreRecordsLimit(
        CollectionNames.WORLD_ABOUT_UKRAINE,
        postsNumber
      );

      posts.forEach((doc) => {
        const docData = doc.data();
        const signleWorldAboutUkraineObject: WorldAboutUkraineObj =
          new WorldAboutUkraineObj(
            docData.title,
            docData.date,
            docData.source,
            docData.sourceUrl,
            docData.imageUrl,
            docData.lead
          );
        postObjects.push(signleWorldAboutUkraineObject);
      });

      setWorldAboutUkraineObjects(postObjects);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const mappedWorldArticles = (): JSX.Element[] => {
    return worldAboutUkraineObjects.map((post, index) => {
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
    getWorldAboutUkrainePosts();
  }, [postsNumber]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <SectionDescription
        title="ART DURING WAR"
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
          width: "100%",
        }}
      >
        {isLoading ? <CircularProgress /> : mappedWorldArticles()}
      </Box>
      <Button variant="outlined" sx={{ marginTop: 5 }}>
        Load more
      </Button>
      <Footer />
    </ThemeProvider>
  );
};

export default WorldAboutUkraine;
