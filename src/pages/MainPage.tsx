import React from "react";

import { ThemeProvider } from "@mui/material";
import Header from "../components/Header";
import theme from "../utils/theme";
import Box from "@mui/material/Box";
import ArticleBox from "../components/ArticleBox";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./MainPage.css";
import SectionButton from "../components/SectionButton";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";

{
  /* <ArticleBox
          title="Crowds in Prague cheer Ukrainian president's address"
          date="12 Feb 2022"
          source="Maria Banias"
          lead="Cheers erupted in Prague as Ukrainian President Volodymyr Zelenskyy addressed crowds in several European cities remotely via video, seeking support amid the Russian invasion of Ukraine. Cheers erupted in Prague as Ukrainian President Volodymyr Zelenskyy addressed crowds in several European cities remotely via video, seeking support amid the Russian invasion of Ukraine.Cheers erupted in Prague as Ukrainian President Volodymyr Zelenskyy addressed crowds in several European cities remotely via video, seeking support amid the Russian invasion of Ukraine."
          text="US Secretary of State Antony Blinken has told the BBC that he is convinced Ukraine can win its war with Russia. He could not say how long the conflict would last, but insisted that Ukraine's defeat was not inevitable. Mr Blinken praised the 'extraordinary resilience' of the Ukrainian people. 'If it's the intention of Moscow to try somehow to topple the government and install its own puppet regime, 45 million Ukrainians are going to reject that one way or the other,' he said.
          
          The war has already not gone as Russian President Vladimir Putin might have planned, he added.
          
          Stiff resistance by Ukrainian forces continued to hamper Russian advances across the country on the ninth day of the invasion.
          
          In the south, Russian forces captured areas along the Black Sea coast, and the port city of Mariupol remained surrounded. But the governor of Mykolaiv said Russian troops had been driven out of the city.
          
          Ukraine's second city of Kharkiv, in the north, also remained under siege. 
          
          Mr Blinken spoke to BBC diplomatic correspondent James Landale after meeting his European Union counterparts in Brussels at the start of a six-day trip to Europe.

He said the international community was committed to doing everything it could to help Ukraine and also to put 'excruciating pressure on Russia to end this war of choice that Vladimir Putin started'.

Asked if he was convinced Ukraine could win, he said: 'Over time, absolutely.'

'I can't tell you how long this will go on. I can't tell you how long it will take. But the idea that Russia can subjugate to its will 45 million people who are ardently fighting for their future and their freedom, that does not involve Russia having its thumb on Ukraine, that tells you a lot.'"
          imageUrl="https://ichef.bbci.co.uk/news/976/cpsprodpb/6CA2/production/_123401872_hi074101989.jpg"
        />
        <ArticleBox
          title="Pence hits Trump: No room in GOP 'for apologists for Putin"
          date="11 Feb 2022"
          source="Maria Banias"
          lead="Lorem ipsum, dolor sit amet consectetur adipisicing elit. "
          text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati cupiditate dolores maxime magni, corrupti iste. Aliquid nemo quos facilis recusandae magni possimus odio rerum sit assumenda nam, illum ipsa nobis."
          imageUrl="https://gdb.voanews.com/c42c0000-0aff-0242-eadd-08d9f8888812_w408_r1_s.jpg"
        /> */
}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    source: "Maria Banias",
    date: "12 Feb 2022",
    imageUrl:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    source: "Roman Kulyk",
    date: "5 Mar 2022",
    imageUrl:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
];
const MainPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />

        <Box sx={{ maxWidth: "100vw" }}>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            // enableMouseEvents
          >
            {images.map((step, index) => (
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
              {images[activeStep].source}
            </Typography>
            <Typography variant="caption">{images[activeStep].date}</Typography>
          </Box>
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
              backgroundColor: "aqua",
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
    </ThemeProvider>
  );
};

export default MainPage;
