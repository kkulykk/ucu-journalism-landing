import { collection, DocumentData, getDocs, QuerySnapshot } from "firebase/firestore";
import { firestore } from "../../utils/firebaseConfig"

enum CollectionNames {
    ANALYTICS_MATERIAL = "analyticalMaterials",
    DAY_PHOTOS = "dayPhotos",
    LEADER_INTERVIEWS = "leaderInterviews",
    WAR_HISTORY = "warHistory",
    WORLD_ABOUT_UKRAINE = "worldAboutUkraine",
}

const getFirestoreRecords = async (firestoreCollection: CollectionNames): Promise<QuerySnapshot<DocumentData>> => {
    const querySnapshot = await getDocs(collection(firestore, firestoreCollection));
    return querySnapshot;
}

export { getFirestoreRecords, CollectionNames }