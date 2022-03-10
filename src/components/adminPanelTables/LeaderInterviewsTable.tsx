import { useState, useEffect } from "react";

import {
  getFirestoreRecordsLimit,
  CollectionNames,
} from "../../services/firebase/firestore";
import { LeaderInterviewsObj } from "../../services/models/firestoreDocuments";
import WarHistoryLeaderInterviewEditModal from "../modals/WarHistoryLeaderInterviewEditModal";

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
  { id: 'title', label: 'Title', minWidth: 200 },
  { id: 'date', label: 'Date', minWidth: 100 },
  { id: 'videoUrl', label: 'Video URL', minWidth: 200 },
];

// Custom types
type EditLeaderInterviewModalType = {
  id: string,
  title: string,
  date: Date,
  videoUrl: string,
}

const LeaderInterviewsTable = () => {
  const [leaderInterviewAdminPanelObjects, setLeaderInterviewAdminPanelObjects] = useState<LeaderInterviewsObj[]>([])
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [tableRecordsNumber, setTableRecordsNumber] = useState<number>(TABLE_RECORDS_NUMBER)

  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false)

  const [editModalValuesObj, setEditModalValuesObj] = useState<EditLeaderInterviewModalType>({
    id: "Initial string",
    title: "Initial string",
    date: new Date(),
    videoUrl: "Initial string",
  })

  const getLeaderInterviewFirestoreRecords = async () => {
    const recordObjectsArray: LeaderInterviewsObj[] = [];
    try {
      setIsTableLoading(true);
      const records = await getFirestoreRecordsLimit(CollectionNames.LEADER_INTERVIEWS, tableRecordsNumber);  
      
      records.forEach((doc) => {
        const docData = doc.data();
        const singleLeaderInterviewAdminPanelObject: LeaderInterviewsObj = new LeaderInterviewsObj(
          doc.id,
          docData.title,
          docData.date,
          docData.videoUrl
        )

        recordObjectsArray.push(singleLeaderInterviewAdminPanelObject);
      })

      setLeaderInterviewAdminPanelObjects(recordObjectsArray);
      setIsTableLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getLeaderInterviewFirestoreRecords();
  }, [tableRecordsNumber]);

    
  const openEditModal = (id: string, title: string, videoUrl: string, date: Date): void => {
    setEditModalValuesObj({id: id, title: title, videoUrl: videoUrl, date: date})
    setEditModalIsOpen(true);    
  }
  
  const renderRows = () => {
    return leaderInterviewAdminPanelObjects.map((rowObject) => {
      return (
          <TableRow onClick={() => openEditModal(rowObject.id, rowObject.title, rowObject.videoUrl, rowObject.dateObj)}>
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
      <Button onClick={() => getLeaderInterviewFirestoreRecords()}>Reload</Button>
      <WarHistoryLeaderInterviewEditModal modalHeading={"War History Post | Id: " + "ID"} modalType={CollectionNames.LEADER_INTERVIEWS} recordValuesObj={editModalValuesObj} getRecordsFunction={getLeaderInterviewFirestoreRecords} modalIsOpen={editModalIsOpen} setModalIsOpen={setEditModalIsOpen} />

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
  );
};

export default LeaderInterviewsTable;
