import { useState } from "react";
import { Link } from "react-router-dom";
import { getFirestoreRecords, CollectionNames } from "../services/firebase/firestore";
import { AnalyticalMaterialsObj } from "../services/models/firestoreDocuments";

const MainPage = () => {
  // const a = getFirestoreRecords(CollectionNames.ANALYTICS_MATERIAL)
  //   .then((res) => {
  //       res.forEach((doc) => {
  //         const document = doc.data()

  //       new AnalyticalMaterialsObj(document.title, document.date, document.source, document.imageUrl, document.lead, document.text).disp();
  //   });
  // });
  
  return (
    <div>
      <Link to={"/world"}>World About Ukraine</Link>
    </div>
  );
};

export default MainPage;
