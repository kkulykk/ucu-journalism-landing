import { useState, useEffect } from "react";

import {
  getFirestoreRecordsLimit,
  CollectionNames,
} from "../../services/firebase/firestore";
import { AnalyticalMaterialsObj } from "../../services/models/firestoreDocuments";
import AnalyticalMaterialEditModal from "../modals/AnalyticalMaterialEditModal";

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
  { id: "title", label: "Title", minWidth: 100 },
  { id: "date", label: "Date", minWidth: 100 },
  { id: "source", label: "Source", minWidth: 100 },
  { id: "imageUrl", label: "Image URL", minWidth: 100 },
  { id: "lead", label: "Lead", minWidth: 200 },
  { id: "text", label: "Text", minWidth: 300 },
  { id: "sourceUrl", label: "Source URL", minWidth: 100 },
];

// Custom types
type EditAnalyticalMaterialModalType = {
  id: string;
  title: string;
  date: Date;
  source: string;
  sourceUrl: string;
  imageUrl: string;
  lead: string;
  text: string;
};

interface Props {
  lastTimeNewAdded: Date;
}

const AnalyticalMaterialsTable = (props: Props) => {
  const [
    analyticalMaterialAdminPanelObjects,
    setAnalyticalMaterialAdminPanelObjects,
  ] = useState<AnalyticalMaterialsObj[]>([]);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [tableRecordsNumber, setTableRecordsNumber] =
    useState<number>(TABLE_RECORDS_NUMBER);

  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);

  const [editModalValuesObj, setEditModalValuesObj] =
    useState<EditAnalyticalMaterialModalType>({
      id: "Initial string",
      title: "Initial string",
      date: new Date(),
      source: "Initial string",
      sourceUrl: "Initial string",
      imageUrl: "Initial string",
      lead: "Initial string",
      text: "Initial string",
    });

  const getAnalyticalMaterialFirestoreRecords = async () => {
    const recordObjectsArray: AnalyticalMaterialsObj[] = [];
    try {
      setIsTableLoading(true);
      const records = await getFirestoreRecordsLimit(
        CollectionNames.ANALYTICS_MATERIAL,
        tableRecordsNumber
      );

      records.forEach((doc) => {
        const docData = doc.data();
        const singleAnalyticalMaterialAdminPanelObject: AnalyticalMaterialsObj =
          new AnalyticalMaterialsObj(
            doc.id,
            docData.title,
            docData.date,
            docData.source,
            docData.sourceUrl,
            docData.imageUrl,
            docData.lead,
            docData.text
          );

        recordObjectsArray.push(singleAnalyticalMaterialAdminPanelObject);
      });

      setAnalyticalMaterialAdminPanelObjects(recordObjectsArray);
      setIsTableLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAnalyticalMaterialFirestoreRecords();
  }, [tableRecordsNumber, props.lastTimeNewAdded]);

  const openEditModal = (
    id: string,
    title: string,
    date: Date,
    source: string,
    sourceUrl: string,
    imageUrl: string,
    lead: string,
    text: string
  ) => {
    setEditModalValuesObj({
      id: id,
      title: title,
      date: date,
      source: source,
      sourceUrl: sourceUrl,
      imageUrl: imageUrl,
      lead: lead,
      text: text,
    });

    setEditModalIsOpen(true);
  };

  const renderRows = () => {
    return analyticalMaterialAdminPanelObjects.map((rowObject, index) => {
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
              rowObject.lead,
              rowObject.text
            )
          }
        >
          {columns.map((column) => {
            const value = (rowObject as any)[column.id];
            return (
              <TableCell
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                key={column.id}
              >
                {column.id === "imageUrl" ? (
                  <img src={value} style={{ height: "120px" }} />
                ) : (
                  value.substring(0, 250)
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
      <AnalyticalMaterialEditModal
        recordValuesObj={editModalValuesObj}
        getRecordsFunction={getAnalyticalMaterialFirestoreRecords}
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
                  style={{
                    minWidth: column.minWidth,
                  }}
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
          onClick={() => getAnalyticalMaterialFirestoreRecords()}
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

export default AnalyticalMaterialsTable;
