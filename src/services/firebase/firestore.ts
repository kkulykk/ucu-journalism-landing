import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../utils/firebaseConfig"

const getData = async () => {
    const querySnapshot = await getDocs(collection(firestore, "dayPhotos"));
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });

    return querySnapshot;
}
export { getData }