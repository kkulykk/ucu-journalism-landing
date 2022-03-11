import { useState, useEffect } from "react";

import {
  getFirestoreRecordsLimit,
  CollectionNames,
} from "../../services/firebase/firestore";
import { WorldAboutUkraineObj } from "../../services/models/firestoreDocuments";
import WorldAboutUkraineEditModal from "../modals/WorldAboutUkraineEditModal";

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
  { id: "title", label: "Title", minWidth: 100 },
  { id: "date", label: "Date", minWidth: 100 },
  { id: "source", label: "Source", minWidth: 100 },
  { id: "sourceUrl", label: "Source URL", minWidth: 300 },
  { id: "imageUrl", label: "Image URL", minWidth: 100 },
  { id: "lead", label: "Lead", minWidth: 200 },
];

// Custom types
type EditWorldAboutUkraineModalType = {
  id: string,
  title: string;
  date: Date;
  source: string;
  sourceUrl: string;
  imageUrl: string;
  lead: string;
};

const WorldAboutUkraineTable = () => {
  const [worldAboutUkraineAdminPanelObjects, setWorldAboutUkraineAdminPanelObjects] = useState<WorldAboutUkraineObj[]>([]);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [tableRecordsNumber, setTableRecordsNumber] = useState<number>(TABLE_RECORDS_NUMBER)

  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false)

  const [editModalValuesObj, setEditModalValuesObj] = useState<EditWorldAboutUkraineModalType>({
    id: "Initial string",
    title: "Initial string",
    date: new Date(),
    source: "Initial string",
    sourceUrl: "Initial string",
    imageUrl: "Initial string",
    lead: "Initial string",
  }) 

  const getWorldAboutUkraineFirebaseRecords = async () => {
    const recordObjectsArray: WorldAboutUkraineObj[] = [];
    try {
      setIsTableLoading(true);
      const records = await getFirestoreRecordsLimit(CollectionNames.WORLD_ABOUT_UKRAINE, tableRecordsNumber);

      records.forEach((doc) => {
        const docData = doc.data();
        const singleWorldAboutUkraineAdminPanelObject: WorldAboutUkraineObj = new WorldAboutUkraineObj(
          doc.id,
          docData.title,
          docData.date,
          docData.source,
          docData.sourceUrl,
          docData.imageUrl,
          docData.lead
        );

        recordObjectsArray.push(singleWorldAboutUkraineAdminPanelObject);
      })
      setWorldAboutUkraineAdminPanelObjects(recordObjectsArray);
      setIsTableLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getWorldAboutUkraineFirebaseRecords();
  }, [tableRecordsNumber]);

  const openEditModal = (id: string, title: string, date: Date, source: string, sourceUrl: string, imageUrl: string, lead: string) => {
    setEditModalValuesObj({
      id: id,
      title: title,
      date: date,
      source: source,
      sourceUrl: sourceUrl,
      imageUrl: imageUrl,
      lead: lead,
    })

    setEditModalIsOpen(true);
  }
  
  const renderRows = () => {
    return worldAboutUkraineAdminPanelObjects.map((rowObject) => {
      return (
        <TableRow onClick={() => openEditModal(rowObject.id, rowObject.title, rowObject.dateObj, rowObject.source, rowObject.sourceUrl, rowObject.imageUrl, rowObject.lead)}>
            {
              columns.map((column) => {
                const value = (rowObject as any)[column.id]; // Yeah, that pretty interesting fix from StackOverflow
                return (
                  <TableCell key={column.id}>
                    {column.id === "imageUrl" ? <img src={value} style={{ height: "120px"}}/> : value}
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
      <Button onClick={() => getWorldAboutUkraineFirebaseRecords()}>Reload</Button>
      <WorldAboutUkraineEditModal recordValuesObj={editModalValuesObj} getRecordsFunction={getWorldAboutUkraineFirebaseRecords} modalIsOpen={editModalIsOpen} setModalIsOpen={setEditModalIsOpen} />

      <TableContainer sx={{ height: "65vh" }}>
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
  );
};

export default WorldAboutUkraineTable;
