import { useState, useEffect } from "react";

import {
    getFirestoreRecordsLimit,
    CollectionNames,
  } from "../../services/firebase/firestore";
import { WorldAboutUkraineObj } from "../../services/models/firestoreDocuments";  
// There will be import of modal

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

const WorldAboutUkraine = () => {
  return (
    <div>WorldAboutUkraine</div>
  )
}

export default WorldAboutUkraine