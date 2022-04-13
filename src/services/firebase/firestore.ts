import {
  collection,
  query,
  orderBy,
  limit,
  DocumentData,
  getDocs,
  QuerySnapshot,
  addDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { firestore } from "../../utils/firebaseConfig";

enum CollectionNames {
  ANALYTICS_MATERIAL = "analyticalMaterials",
  DAY_PHOTOS = "dayPhotos",
  LEADER_INTERVIEWS = "leaderInterviews",
  WAR_HISTORY = "warHistory",
  WORLD_ABOUT_UKRAINE = "worldAboutUkraine",
  WORLD_SUPPORT = 'WorldSupport'
}

const getFirestoreRecordsLimit = async (
  firestoreCollection: CollectionNames,
  recordsLimit: number
): Promise<QuerySnapshot<DocumentData>> => {
  const recordsRef = collection(firestore, firestoreCollection);
  const querySnapshot = query(
    recordsRef,
    orderBy("date", "desc"),
    limit(recordsLimit)
  );

  const records = await getDocs(querySnapshot);
  return records;
};

const fetchAdminName = async (uid: string | undefined): Promise<QuerySnapshot<DocumentData>> => {
  const adminsRef = collection(firestore, "admins");
  const querySnapshot = query(adminsRef, where("uid", "==", uid));
  const doc = await getDocs(querySnapshot);
  
  return doc;
};

// Functions for adding records










const addAnalyticalMaterials = async () => {
  const singleAnalyticalMaterial = {
    title: "What Happened on Day 7 of Russia’s Invasion of Ukraine",
    date: Timestamp.fromDate(new Date("March 2, 2022")),
    source: "The New York Times",
    imageUrl:
      "https://static01.nyt.com/images/2022/04/02/world/02ukraine-briefing-header-03/merlin_203109678_16104fc1-0d05-4345-aac3-c7f26d8e78da-superJumbo.jpg?quality=75&auto=webp",
    lead: "Ukraine’s Zaporizhzhia nuclear plant was seized by Russian military forces, according to regional authorities, after a fire sparked by overnight shelling burned for several hours at the largest facility of its kind in Europe. The head of the International Atomic Energy Agency said there had been no release of radiation. The death toll from Russian airstrikes in a residential district of the northern city of Chernihiv rose to 47, regional authorities said.",
    text: `Ukraine’s Zaporizhzhia nuclear plant was seized by Russian military forces, according to regional authorities, after a fire sparked by overnight shelling burned for several hours at the largest facility of its kind in Europe. The head of the International Atomic Energy Agency said there had been no release of radiation. The death toll from Russian airstrikes in a residential district of the northern city of Chernihiv rose to 47, regional authorities said.
            Fire breaks out at the site of the Zaporizhzhia nuclear power plant:
            
            Drone footage shows how explosions destroyed parts of the town of Borodyanka, near Kyiv:`,
  };

  const docRef = await addDoc(
    collection(firestore, CollectionNames.ANALYTICS_MATERIAL),
    singleAnalyticalMaterial
  );
};

export { getFirestoreRecordsLimit, fetchAdminName, CollectionNames };
