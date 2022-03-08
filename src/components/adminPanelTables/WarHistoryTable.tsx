import { useState, useEffect } from "react";

import {
  getFirestoreRecordsLimit,
  CollectionNames,
} from "../../services/firebase/firestore";
import { WarHistoryObj } from "../../services/models/firestoreDocuments";
import WarHistoryLeaderInterviewEditModal from "../modals/WarHistoryLeaderInterviewEditModal";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// Constants
const TABLE_RECORDS_NUMBER = 1;


const columns: {id: string, label: string, minWidth: number}[] = [
  { id: 'title', label: 'Title', minWidth: 200 },
  { id: 'date', label: 'Date', minWidth: 100 },
  { id: 'videoUrl', label: 'Video URL', minWidth: 200 },
];



const WarHistoryTable = () => {
  const [warHistoryAdminPanelObject, setWarHistoryAdminPanelObject] = useState<WarHistoryObj[]>([])
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [tableRecordsNumber, setTableRecordsNumber] = useState<number>(TABLE_RECORDS_NUMBER)

  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false)

  const [editModalTitle, setEditModalTitle] = useState<string>("11111")
  const [editModalVideoUrl, setEditModalVideoUrll] = useState<string>("33333")
  const [editModalDate, setEditModalDate] = useState<Date>(new Date())

  const getWarHistoryFirestoreRecords = async () => {
    const recordObjectsArray: WarHistoryObj[] = [];
    try {
      setIsTableLoading(true);
      const records = await getFirestoreRecordsLimit(CollectionNames.WAR_HISTORY, tableRecordsNumber);  
      
      records.forEach((doc) => {
        const docData = doc.data();
        const singleWarHistoryAdminPanelObject: WarHistoryObj = new WarHistoryObj(
          doc.id,
          docData.title,
          docData.date,
          docData.videoUrl
        )

        recordObjectsArray.push(singleWarHistoryAdminPanelObject);
      })

      setWarHistoryAdminPanelObject(recordObjectsArray);
      setIsTableLoading(false);
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getWarHistoryFirestoreRecords()
  }, [tableRecordsNumber])

  const openEditModal = (title: string, videoUrl: string, date: Date): void => {
    setEditModalTitle(title);
    setEditModalVideoUrll(videoUrl);
    setEditModalDate(date);

    setEditModalIsOpen(true);    
  }

  const renderRows = () => {
    return warHistoryAdminPanelObject.map((rowObject) => {
      return (
        <Box>

          <TableRow onClick={() => openEditModal(rowObject.title, rowObject.videoUrl, rowObject.dateObj)}>
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
            </Box>
      )
    })
  }





  return (
    <Box>
      <WarHistoryLeaderInterviewEditModal modalHeading={"War History Post | Id: " + "ID"} title={editModalTitle} videoUrl={editModalVideoUrl} date={editModalDate} modalIsOpen={editModalIsOpen} setModalIsOpen={setEditModalIsOpen} />

      <TableContainer sx={{ height: 250, background: "aqua" }}>
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

export default WarHistoryTable;
