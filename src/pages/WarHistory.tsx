import { useState, useEffect } from "react";
import {
  getFirestoreRecordsLimit,
  CollectionNames,
} from "../services/firebase/firestore";
import { WarHistoryObj } from "../services/models/firestoreDocuments";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionDescription from "../components/SectionDescription";
import { ThemeProvider } from "@mui/material";
import theme from "../utils/theme";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import VideoPost from "../components/VideoPost";
import SkeletonVideo from "../components/SkeletonVideo";

// Constants
const VIDEOS_NUMBER = 2;

const WarHistory = () => {
  const [warHistoryObjects, setWarHistoryObjects] = useState<WarHistoryObj[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videosNumber, setVideosNumber] = useState<number>(VIDEOS_NUMBER);

  const getWarHistoryVideos = async () => {
    const videoObjectsArray: WarHistoryObj[] = [];
    try {
      setIsLoading(true); // switch ON page loader
      const videos = await getFirestoreRecordsLimit(
        CollectionNames.WAR_HISTORY,
        videosNumber
      );

      videos.forEach((doc) => {
        const docData = doc.data();
        const singleWarHistoryObject: WarHistoryObj = new WarHistoryObj(
          doc.id,
          docData.title,
          docData.date,
          docData.videoUrl
        );
        videoObjectsArray.push(singleWarHistoryObject);
      });

      setWarHistoryObjects(videoObjectsArray);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const mappedHistoryVideoPosts = () => {
    return warHistoryObjects.map((video, index) => {
      return (
        <VideoPost
          key={index}
          title={video.title}
          date={video.date}
          videoUrl={video.videoUrl}
        />
      );
    });
  };

  useEffect(() => {
    getWarHistoryVideos();
  }, [videosNumber]);

  return (
    <ThemeProvider theme={theme}>
      <Header />

      <SectionDescription
        title="War History"
        desc="Here we describe the objectivs of the project and tell readers what we
        mainly post here. There is also small description of all the authors and
        so on"
      />
      <Box sx={{ display: "flex", flexWrap: "wrap", p: "0 8%" }}>
        {isLoading ? <SkeletonVideo /> : mappedHistoryVideoPosts()}
      </Box>
      <Button
        disabled={isLoading}
        variant="outlined"
        sx={{ marginTop: 5 }}
        onClick={() => setVideosNumber(videosNumber + VIDEOS_NUMBER)}
      >
        Load more
      </Button>
      <Footer />
    </ThemeProvider>
  );
};

export default WarHistory;
