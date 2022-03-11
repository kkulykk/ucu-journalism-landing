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
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./MainPage.css";
import SectionButton from "../components/SectionButton";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import PartnerButton from "../components/PartnerButton";
import Footer from "../components/Footer";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const MAX_PHOTOS = 10;

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
          doc.id,
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
            paddingRight: 2,
            fontWeight: "400",
            color: "white",
            position: "absolute",
            top: "55vh",
            left: 0,
            paddingLeft: "5%",
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
              desc="About those who are witnesses and participants in the war with Russia, who suffered from the shelling, who are helping military and civilians by 'quiet and tireless work'"
              link="stories"
            />
            <SectionButton
              title="OPINION LEADERS INTERVIEWS"
              desc=" 
              Opinions of political scientists, historians, teachers, psychologists and other opinion leaders about the war waged by Russia"
              link="leaders"
            />
            <SectionButton
              title="UKRAINE AND GLOBAL AGENDA"
              desc="A look at the war from Ukrainian experts and the world media"
              link="global"
            />
            <SectionButton
              title="ART DURING WAR"
              desc="Art is also a weapon"
              link="art"
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              "@media (min-width:800px)": {
                width: "800px",
              },
              aspectRatio: "16 / 9",
              marginTop: 3,
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/VKP_WdbgqNc?rel=0&mute=1&amp;autoplay=1"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "10vh",
          }}
        >
          <Typography variant="h2" color="secondary">
            Partner Projects
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "95%",
              flexWrap: "wrap",
              marginTop: 3,
            }}
          >
            <PartnerButton
              title="WeAreUkraine.info"
              link="https://www.weareukraine.info/?fbclid=IwAR1-EP6YgUVdN5ROpplm9BRMikxhF3UQbMdvp4La2DnGlKpVe3agtKxMw1U"
            />
            <PartnerButton title="Betha.in.ua" link="https://betha.in.ua" />
            <PartnerButton
              title="Warinua.ucu.edu.ua"
              link="https://warinua.ucu.edu.ua/ucu-student-projects/"
            />
            <PartnerButton title="UCU Website" link="https://ucu.edu.ua/en" />
            <PartnerButton title="UCCMC" link="https://uccmc.org" />
            <PartnerButton
              title="Post To Stop War"
              link="https://post-to-stop-war.in.ua"
            />
          </Box>
        </Box>
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default MainPage;
