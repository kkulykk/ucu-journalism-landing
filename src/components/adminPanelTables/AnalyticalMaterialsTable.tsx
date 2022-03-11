import { useState, useEffect } from "react";

import {
  getFirestoreRecordsLimit,
  CollectionNames,
} from "../../services/firebase/firestore";
import { AnalyticalMaterialsObj } from "../../services/models/firestoreDocuments";
import AnalyticalMaterialEditModal from "../modals/AnalyticalMaterialEditModal";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// Constants
const TABLE_RECORDS_NUMBER = 10;

const columns: {id: string, label: string, minWidth: number}[] = [
  { id: 'title', label: 'Title', minWidth: 100 },
  { id: 'date', label: 'Date', minWidth: 100 },
  { id: 'source', label: 'Source', minWidth: 100 },
  { id: 'imageUrl', label: 'Image URL', minWidth: 100},
  { id: 'lead', label: 'Lead', minWidth: 200 },
  { id: 'text', label: 'Text', minWidth: 300 },
];

// Custom types
type EditAnalyticalMaterialModalType = {
  id: string,
  title: string,
  date: Date,
  source: string,
  imageUrl: string,
  lead: string,
  text: string,
}

const AnalyticalMaterialsTable = () => {
  const [analyticalMaterialAdminPanelObjects, setAnalyticalMaterialAdminPanelObjects] = useState<AnalyticalMaterialsObj[]>([])
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [tableRecordsNumber, setTableRecordsNumber] = useState<number>(TABLE_RECORDS_NUMBER)

  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false)

  const [editModalValuesObj, setEditModalValuesObj] = useState<EditAnalyticalMaterialModalType>({
    id: "Initial string",
    title: "Initial string",
    date: new Date(),
    source: "Initial string",
    imageUrl: "Initial string",
    lead: "Initial string",
    text: "Initial string",
  }) 

  const getAnalyticalMaterialFirestoreRecords = async () => {
    const recordObjectsArray: AnalyticalMaterialsObj[] = [];
    try {
      setIsTableLoading(true);
      const records = await getFirestoreRecordsLimit(CollectionNames.ANALYTICS_MATERIAL, tableRecordsNumber);

      records.forEach((doc) => {
        const docData = doc.data();
        const singleAnalyticalMaterialAdminPanelObject: AnalyticalMaterialsObj = new AnalyticalMaterialsObj(
          doc.id,
          docData.title,
          docData.date,
          docData.source,
          docData.imageUrl,
          docData.lead,
          docData.text
        )

        recordObjectsArray.push(singleAnalyticalMaterialAdminPanelObject);
      })

      setAnalyticalMaterialAdminPanelObjects(recordObjectsArray);
      setIsTableLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getAnalyticalMaterialFirestoreRecords();
  }, [tableRecordsNumber]);

  const openEditModal = (id: string, title: string, date: Date, source: string, imageUrl: string, lead: string, text: string) => {
    setEditModalValuesObj({
      id: id,
      title: title,
      date: date,
      source: source,
      imageUrl: imageUrl,
      lead: lead,
      text: text
    })

    setEditModalIsOpen(true);
  }
  
  const renderRows = () => {
    return analyticalMaterialAdminPanelObjects.map((rowObject) => {
      return (
        <TableRow onClick={() => openEditModal(rowObject.id, rowObject.title, rowObject.dateObj, rowObject.source, rowObject.imageUrl, rowObject.lead, rowObject.text)} >
          {
            columns.map((column) => {
              const value = (rowObject as any)[column.id];
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
      <Button onClick={() => getAnalyticalMaterialFirestoreRecords()}>Reload</Button>
      <AnalyticalMaterialEditModal recordValuesObj={editModalValuesObj} getRecordsFunction={getAnalyticalMaterialFirestoreRecords} modalIsOpen={editModalIsOpen} setModalIsOpen={setEditModalIsOpen}/>

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
  )
}

export default AnalyticalMaterialsTable;