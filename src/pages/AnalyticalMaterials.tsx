import { useState, useEffect } from "react";
import {
  getFirestoreRecords,
  CollectionNames,
} from "../services/firebase/firestore";
import { AnalyticalMaterialsObj } from "../services/models/firestoreDocuments"
import { ThemeProvider } from "@mui/material";
import theme from "../utils/theme";
import Header from "../components/Header";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArticleBox from "../components/ArticleBox";

const AnalyticalMaterials = () => {
  const [analyticalMaterialObjects, setAnalyticalMaterialObjects] = useState<AnalyticalMaterialsObj[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getAnalyticalMaterialPosts = async () => {
    const postsArray: AnalyticalMaterialsObj[]  = []
    try {
      setIsLoading(true) // switch ON page loader
      const posts = await getFirestoreRecords(CollectionNames.ANALYTICS_MATERIAL)

      posts.forEach((doc) => {
        const docData = doc.data()
        const singleAnalyticalMaterialPost: AnalyticalMaterialsObj = new AnalyticalMaterialsObj(docData.title, docData.date,
          docData.source, docData.imageUrl, docData.lead, docData.text)
          postsArray.push(singleAnalyticalMaterialPost)
      })

      setAnalyticalMaterialObjects(postsArray)

      setIsLoading(false) // switch OFF page loader
    } catch (err) {
      console.error(err)
    }
  }

  const mappedArticleBoxes = (): JSX.Element[] => {
    return analyticalMaterialObjects.map((post, index) => {
      return (<ArticleBox key={index} title={post.title} date={post.date} source={post.source} imageUrl={post.imageUrl} lead={post.lead} text={post.text}/>)
    });

  }

  useEffect(() => {
    getAnalyticalMaterialPosts()
  }, [])





  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <Typography>AnalyticalMaterials</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          {isLoading ? "Loading" : mappedArticleBoxes()}
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default AnalyticalMaterials;
