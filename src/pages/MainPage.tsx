import { useState, useEffect } from "react";
import {
  getFirestoreRecords,
  CollectionNames,
} from "../services/firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import { dayPhotosObj } from "../services/models/firestoreDocuments";
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

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const MAXX = 7;

const MainPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [dayPhotosObjects, setDayPhotosObjects] = useState<dayPhotosObj[]>([]);

  const getDayPhotos = async () => {
    const dayPhotosArray: dayPhotosObj[] = [];
    try {
      setIsLoading(true); // switch ON page loader
      const photos = await getFirestoreRecords(CollectionNames.DAY_PHOTOS, 3);

      photos.forEach((doc) => {
        const docData = doc.data();
        const singleDayPhotoObject: dayPhotosObj = new dayPhotosObj(
          docData.imageUrl,
          docData.date,
          docData.source
        );
        dayPhotosArray.push(singleDayPhotoObject);
      });

      setDayPhotosObjects(dayPhotosArray);

      setIsLoading(false);
      console.log(dayPhotosArray);
    } catch (err) {
      console.error(err);
    }
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
                  alt={step.source}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            backgroundColor: "rgb(0, 0, 0, 0.5)",
            paddingLeft: 2,
            fontWeight: "400",
            color: "white",
            position: "absolute",
            top: "60vh",
            right: 0,
            paddingRight: "5%",
          }}
        >
          <Typography variant="caption">
            {dayPhotosObjects[activeStep]?.source}
          </Typography>
          <Typography variant="caption">
            {dayPhotosObjects[activeStep]?.date}
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
              // backgroundColor: "aqua",
              width: 3 / 4,
              flexWrap: "wrap",
            }}
          >
            <SectionButton
              title="War Stories"
              desc="Here goes description what is this section about"
              link="stories"
            />
            <SectionButton
              title="Leaders Interviews"
              desc="Here goes description what is this section about"
              link="leaders"
            />
            <SectionButton
              title="Analytical Materials"
              desc="Here goes description what is this section about"
              link="analytics"
            />
            <SectionButton
              title="The World About Ukraine "
              desc="Here goes description what is this section about"
              link="world"
            />
          </Box>
        </Box>
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default MainPage;
