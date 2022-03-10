import { useState, useEffect } from "react";

import {
  getFirestoreRecordsLimit,
  CollectionNames,
} from "../../services/firebase/firestore";
import { DayPhotosObj } from "../../services/models/firestoreDocuments";
import DayPhotoEditModal from "../modals/DayPhotoEditModal";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// Constants
const TABLE_RECORDS_NUMBER = 10;

const columns: { id: string; label: string; minWidth: number }[] = [
  { id: "description", label: "Description", minWidth: 200 },
  { id: "date", label: "Date", minWidth: 100 },
  { id: "source", label: "Source", minWidth: 200 },
  { id: "imageUrl", label: "Image URL", minWidth: 200 },
];

// Custom types
type EditDayPhotoType = {
  id: string,
  imageUrl: string;
  date: Date;
  source: string;
  description: string;
};

const DayPhotosTable = () => {
  const [dayPhotoAdminPanelObjects, setDayPhotoAdminPanelObjects] = useState<DayPhotosObj[]>([]);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [tableRecordsNumber, setTableRecordsNumber] = useState<number>(TABLE_RECORDS_NUMBER);

  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);

  const [editModalValuesObj, setEditModalValuesObj] = useState<EditDayPhotoType>({
      id: "Initial string",
      imageUrl: "Initial string",
      date: new Date(),
      source: "Initial string",
      description: "Initial string",
    });

  const getDayPhotoFirestoreRecords = async () => {
    const recordObjectsArray: DayPhotosObj[] = [];
    try {
      setIsTableLoading(true);
      const records = await getFirestoreRecordsLimit(CollectionNames.DAY_PHOTOS, tableRecordsNumber);

      records.forEach((doc) => {
          const docData = doc.data();
          const singleDayPhotoAdminPanelObject: DayPhotosObj = new DayPhotosObj(
              doc.id,
              docData.imageUrl,
              docData.date,
              docData.source,
              docData.description
          )
          recordObjectsArray.push(singleDayPhotoAdminPanelObject);
        })

        setDayPhotoAdminPanelObjects(recordObjectsArray);
        setIsTableLoading(false);
    } catch (err) {
        console.log(err)
    }    
  }
  
  useEffect(() => {
    getDayPhotoFirestoreRecords();
  }, [tableRecordsNumber]);

  const openEditModal = (id: string, imageUrl: string, date: Date, source: string, description: string,): void => {
    setEditModalValuesObj({id: id, imageUrl: imageUrl, date: date, source: source, description: description})
    setEditModalIsOpen(true);    
  }

  const renderRows = () => {
    return dayPhotoAdminPanelObjects.map((rowObject) => {
      return (
          <TableRow onClick={() => openEditModal(rowObject.id, rowObject.imageUrl, rowObject.dateObj, rowObject.source, rowObject.description)}>
            {
              columns.map((column) => {
                const value = (rowObject as any)[column.id]; // Yeah, that pretty interesting fix from StackOverflow
                return (
                  <TableCell key={column.id}>
                    {value}
                  </TableCell>
                )
              })
            }
          </TableRow>
      )
    })
  }


  return (
    <Box>
      <Button onClick={() => getDayPhotoFirestoreRecords()}>Reload</Button>
      <DayPhotoEditModal recordValuesObj={editModalValuesObj} getRecordsFunction={getDayPhotoFirestoreRecords} modalIsOpen={editModalIsOpen} setModalIsOpen={setEditModalIsOpen}/>

      <TableContainer sx={{ height: 500, background: "beige" }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                  <TableCell
                  key={column.id}
                    style={{ top: 57, minWidth: column.minWidth }}
                    >
                    {column.label}
                  </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isTableLoading ? "Loading" : renderRows()}
            <Button
              disabled={isTableLoading}
              variant="outlined"
              sx={{ marginTop: 5 }}
              onClick={() => setTableRecordsNumber(tableRecordsNumber + TABLE_RECORDS_NUMBER)}
              >
              Load more
            </Button>
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  )
};

export default DayPhotosTable;
