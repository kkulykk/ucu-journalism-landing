import { useState, useEffect } from "react";

import {
  getFirestoreRecordsLimit,
  CollectionNames,
} from "../../services/firebase/firestore";
import { WorldSupportObj } from "../../services/models/firestoreDocuments";
import WorldSupportEditModal from "../modals/WorldSupportEditModal";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";


//WorldAboutUkraineEditModal
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
  id: string;
  title: string;
  date: Date;
  source: string;
  sourceUrl: string;
  imageUrl: string;
  lead: string;
};

interface Props {
  lastTimeNewAdded: Date;
}

const WorldSupportTable = (props: Props) => {
  const [
    worldAboutUkraineAdminPanelObjects,
    setWorldAboutUkraineAdminPanelObjects,
  ] = useState<WorldSupportObj[]>([]);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [tableRecordsNumber, setTableRecordsNumber] =
    useState<number>(TABLE_RECORDS_NUMBER);

  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);

  const [editModalValuesObj, setEditModalValuesObj] =
    useState<EditWorldAboutUkraineModalType>({
      id: "Initial string",
      title: "Initial string",
      date: new Date(),
      source: "Initial string",
      sourceUrl: "Initial string",
      imageUrl: "Initial string",
      lead: "Initial string",
    });

  const getWorldAboutUkraineFirebaseRecords = async () => {
    const recordObjectsArray: WorldSupportObj[] = [];
    try {
      setIsTableLoading(true);
      const records = await getFirestoreRecordsLimit(
        CollectionNames.WORLD_SUPPORT,
        tableRecordsNumber
      );

      records.forEach((doc) => {
        const docData = doc.data();
        const singleWorldAboutUkraineAdminPanelObject: WorldSupportObj =
          new WorldSupportObj(
            doc.id,
            docData.title,
            docData.date,
            docData.source,
            docData.sourceUrl,
            docData.imageUrl,
            docData.lead
          );

        recordObjectsArray.push(singleWorldAboutUkraineAdminPanelObject);
      });
      setWorldAboutUkraineAdminPanelObjects(recordObjectsArray);
      setIsTableLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWorldAboutUkraineFirebaseRecords();
  }, [tableRecordsNumber, props.lastTimeNewAdded]);

  const openEditModal = (
    id: string,
    title: string,
    date: Date,
    source: string,
    sourceUrl: string,
    imageUrl: string,
    lead: string
  ) => {
    setEditModalValuesObj({
      id: id,
      title: title,
      date: date,
      source: source,
      sourceUrl: sourceUrl,
      imageUrl: imageUrl,
      lead: lead,
    });

    setEditModalIsOpen(true);
  };

  const renderRows = () => {
    return worldAboutUkraineAdminPanelObjects.map((rowObject, index) => {
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
              rowObject.dateObj,
              rowObject.source,
              rowObject.sourceUrl,
              rowObject.imageUrl,
              rowObject.lead
            )
          }
        >
          {columns.map((column) => {
            const value = (rowObject as any)[column.id]; // Yeah, that pretty interesting fix from StackOverflow
            return (
              <TableCell key={column.id}>
                {column.id === "imageUrl" ? (
                  <img src={value} style={{ height: "120px" }} />
                ) : (
                  value
                )}
              </TableCell>
            );
          })}
        </TableRow>
      );
    });
  };

  return (
    <Box>
      <WorldSupportEditModal
        recordValuesObj={editModalValuesObj}
        getRecordsFunction={getWorldAboutUkraineFirebaseRecords}
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
          onClick={() => getWorldAboutUkraineFirebaseRecords()}
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

export default WorldSupportTable;
