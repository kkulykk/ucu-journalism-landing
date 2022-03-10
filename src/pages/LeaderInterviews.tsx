import { useState, useEffect } from "react";
import {
  getFirestoreRecordsLimit,
  CollectionNames,
} from "../services/firebase/firestore";
import { LeaderInterviewsObj } from "../services/models/firestoreDocuments";

import Footer from "../components/Footer";
import Header from "../components/Header";
import SectionDescription from "../components/SectionDescription";
import { ThemeProvider } from "@mui/material";
import theme from "../utils/theme";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import VideoPost from "../components/VideoPost";
import SkeletonVideo from "../components/SkeletonVideo";

// Constants
const VIDEOS_NUMBER = 5;

const LeaderInterviews = () => {
  const [leaderInterviewObjects, setLeaderInterviewObjects] = useState<
    LeaderInterviewsObj[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videosNumber, setVideosNumber] = useState<number>(VIDEOS_NUMBER);

  const getLeaderInterviewVideos = async () => {
    const videoObjectsArray: LeaderInterviewsObj[] = [];
    try {
      setIsLoading(true);
      const videos = await getFirestoreRecordsLimit(
        CollectionNames.LEADER_INTERVIEWS,
        videosNumber
      );

      videos.forEach((doc) => {
        const docData = doc.data();
        const singleLeaderInterviewObject: LeaderInterviewsObj =
          new LeaderInterviewsObj(
            docData.title,
            docData.date,
            docData.videoUrl
          );
        videoObjectsArray.push(singleLeaderInterviewObject);
      });

      setLeaderInterviewObjects(videoObjectsArray);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const mappedLeaderInterviewVideoPosts = () => {
    return leaderInterviewObjects.map((video, index) => {
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
    getLeaderInterviewVideos();
  }, [videosNumber]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <SectionDescription
        title="OPINION LEADERS INTERVIEWS"
        desc="Opinions of political scientists, historians, teachers, psychologists and other opinion leaders about the war waged by Russia"
      />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          m: 0,
          justifyContent: "center",
        }}
      >
        {isLoading ? <SkeletonVideo /> : mappedLeaderInterviewVideoPosts()}
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

export default LeaderInterviews;
