import { useState, useEffect } from "react";
import {
  getFirestoreRecordsLimit,
  CollectionNames,
} from "../services/firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import { DayPhotosObj } from "../services/models/firestoreDocuments";
import { ThemeProvider } from "@mui/material";
import Header from "../components/Header";
import theme from "../utils/theme";
import Box from "@mui/material/Box";
import ArticleBox from "../components/ArticleBox";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./MainPage.css";
import SectionButton from "../components/SectionButton";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import Footer from "../components/Footer";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import VideoPost from "../components/VideoPost";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const MAX_PHOTOS = 3;

const MainPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [dayPhotosObjects, setDayPhotosObjects] = useState<DayPhotosObj[]>([]);

  const getDayPhotos = async () => {
    const dayPhotosArray: DayPhotosObj[] = [];
    try {
      setIsLoading(true); // switch ON page loader
      const photos = await getFirestoreRecordsLimit(
        CollectionNames.DAY_PHOTOS,
        MAX_PHOTOS
      );

      photos.forEach((doc) => {
        const docData = doc.data();
        const singleDayPhotoObject: DayPhotosObj = new DayPhotosObj(
          docData.imageUrl,
          docData.date,
          docData.source,
          docData.description
        );
        dayPhotosArray.push(singleDayPhotoObject);
      });

      setDayPhotosObjects(dayPhotosArray);

      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  useEffect(() => {
    getDayPhotos();
  }, []);

  const Slider = () => {
    return (
      <Box>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          // enableMouseEvents
        >
          {dayPhotosObjects.map((step, index) => (
            <div key={step.date}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: "60vh",
                    display: "block",
                    maxWidth: "100vw",
                    overflow: "hidden",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  src={step.imageUrl}
                  alt={step.description}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <Box
          sx={{
            position: "absolute",
            top: "35vh",
            right: 0,
            width: "100vw",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            size="large"
            color={"info"}
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            <MdKeyboardArrowLeft size={42} />
          </Button>
          <Button
            size="large"
            color={"info"}
            onClick={handleNext}
            disabled={activeStep === MAX_PHOTOS - 1}
          >
            <MdKeyboardArrowRight size={42} />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(0, 0, 0, 0.5)",
            paddingLeft: 2,
            fontWeight: "400",
            color: "white",
            position: "absolute",
            top: "55vh",
            right: 0,
            paddingRight: "5%",
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="caption">
              {dayPhotosObjects[activeStep]?.source}
            </Typography>
            <Typography variant="caption">
              {dayPhotosObjects[activeStep]?.date}
            </Typography>
          </Box>
          <Typography variant="body2">
            {dayPhotosObjects[activeStep]?.description}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <Box
          sx={{
            maxWidth: "100vw",
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoading ? <CircularProgress /> : Slider()}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "95%",
              flexWrap: "wrap",
              marginTop: 3,
            }}
          >
            <SectionButton
              title="RESILIENCE STORIES"
              desc="Here goes description what is this section about"
              link="stories"
            />
            <SectionButton
              title="OPINION LEADERS INTERVIES"
              desc="Here goes description what is this section about"
              link="leaders"
            />
            <SectionButton
              title="UKRAINE AND GLOBAL AGENDA"
              desc="Here goes description what is this section about"
              link="analytics"
            />
            <SectionButton
              title="ART DURING WAR"
              desc="Here goes description what is this section about"
              link="world"
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100vw",
            marginTop: 3,
          }}
        >
          <VideoPost
            title="You are the part of the big Ukrainian ocean"
            date="08 Mar 2022"
            videoUrl="https://www.youtube.com/embed/VKP_WdbgqNc?autoplay=1"
          />
        </Box>
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default MainPage;
