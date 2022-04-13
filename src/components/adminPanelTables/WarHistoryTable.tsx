import { useState, useEffect } from "react";

import {
  getFirestoreRecordsLimit,
  CollectionNames,
} from "../../services/firebase/firestore";
import { WarHistoryObj } from "../../services/models/firestoreDocuments";
import WarHistoryLeaderInterviewEditModal from "../modals/WarHistoryLeaderInterviewEditModal";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

// Constants
const TABLE_RECORDS_NUMBER = 10;

const columns: { id: string; label: string; minWidth: number }[] = [
  { id: "title", label: "Title", minWidth: 200 },
  { id: "date", label: "Date", minWidth: 100 },
  { id: "videoUrl", label: "Video URL", minWidth: 200 },
];

// Custom types
type EditWarHistoryModalType = {
  id: string;
  title: string;
  date: Date;
  videoUrl: string;
};

interface Props {
  lastTimeNewAdded: Date;
}

const WarHistoryTable = (props: Props) => {
  const [warHistoryAdminPanelObjects, setWarHistoryAdminPanelObjects] =
    useState<WarHistoryObj[]>([]);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [tableRecordsNumber, setTableRecordsNumber] =
    useState<number>(TABLE_RECORDS_NUMBER);

  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);

  const [editModalValuesObj, setEditModalValuesObj] =
    useState<EditWarHistoryModalType>({
      id: "Initial string",
      title: "Initial string",
      date: new Date(),
      videoUrl: "Initial string",
    });

  const getWarHistoryFirestoreRecords = async () => {
    const recordObjectsArray: WarHistoryObj[] = [];
    try {
      setIsTableLoading(true);
      const records = await getFirestoreRecordsLimit(
        CollectionNames.WAR_HISTORY,
        tableRecordsNumber
      );

      records.forEach((doc) => {
        const docData = doc.data();
        const singleWarHistoryAdminPanelObject: WarHistoryObj =
          new WarHistoryObj(
            doc.id,
            docData.title,
            docData.date,
            docData.videoUrl
          );

        recordObjectsArray.push(singleWarHistoryAdminPanelObject);
      });

      setWarHistoryAdminPanelObjects(recordObjectsArray);
      setIsTableLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getWarHistoryFirestoreRecords();
  }, [tableRecordsNumber, props.lastTimeNewAdded]);

  const openEditModal = (
    id: string,
    title: string,
    videoUrl: string,
    date: Date
  ): void => {
    setEditModalValuesObj({
      id: id,
      title: title,
      videoUrl: videoUrl,
      date: date,
    });
    setEditModalIsOpen(true);
  };

  const renderRows = () => {
    return warHistoryAdminPanelObjects.map((rowObject, index) => {
      return (
        <TableRow
          sx={{
            cursor: "pointer",
            backgroundColor: index % 2 === 0 ? "white" : "#fafafa",
          }}
          onClick={() =>
            openEditModal(
              rowObject.id,
              rowObject.title,
              rowObject.videoUrl,
              rowObject.dateObj
            )
          }
        >
          {columns.map((column) => {
            const value = (rowObject as any)[column.id]; // Yeah, that pretty interesting fix from StackOverflow
            return <TableCell key={column.id}>{value}</TableCell>;
          })}
        </TableRow>
      );
    });
  };

  return (
    <Box>
      <WarHistoryLeaderInterviewEditModal
        modalHeading={"Resilience Story Post"}
        modalType={CollectionNames.WAR_HISTORY}
        recordValuesObj={editModalValuesObj}
        getRecordsFunction={getWarHistoryFirestoreRecords}
        modalIsOpen={editModalIsOpen}
        setModalIsOpen={setEditModalIsOpen}
      />

      <TableContainer sx={{ height: "62vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isTableLoading ? (
              <Box
                sx={{
                  height: "50vh",
                  width: "100vw",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              renderRows()
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",

          marginTop: "3vh",
          postition: "absolute",
        }}
      >
        <Button
          color="secondary"
          onClick={() => getWarHistoryFirestoreRecords()}
        >
          Reload
        </Button>

        <Button
          disabled={isTableLoading}
          variant="outlined"
          onClick={() =>
            setTableRecordsNumber(tableRecordsNumber + TABLE_RECORDS_NUMBER)
          }
        >
          Load more
        </Button>
      </Box>
    </Box>
  );
};

export default WarHistoryTable;
