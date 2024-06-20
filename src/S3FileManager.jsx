/* eslint-disable no-unused-vars */
// src/S3FileManager.js
import React, { useState } from "react";
import s3 from "./aws-config";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const S3FileManager = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [bucketName, setBucketName] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || !bucketName) return;

    const params = {
      Bucket: bucketName,
      Key: selectedFile.name,
      Body: selectedFile,
    };

    try {
      await s3.upload(params).promise();
      alert("File uploaded successfully");
      fetchFiles();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleDelete = async (fileName) => {
    const params = {
      Bucket: bucketName,
      Key: fileName,
    };

    try {
      await s3.deleteObject(params).promise();
      alert("File deleted successfully");
      fetchFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const fetchFiles = async () => {
    const params = {
      Bucket: bucketName,
    };

    try {
      const data = await s3.listObjectsV2(params).promise();
      setFiles(data.Contents);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        S3 File Manager
      </Typography>
      <Box mb={2}>
        <TextField
          label="Bucket Name"
          variant="outlined"
          fullWidth
          value={bucketName}
          onChange={(e) => setBucketName(e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <Button variant="contained" color="primary" onClick={fetchFiles}>
          Fetch Files
        </Button>
      </Box>
      <Box mb={2}>
        <input type="file" onChange={handleFileChange} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!selectedFile}
        >
          Upload
        </Button>
      </Box>
      <List>
        {files.map((file) => (
          <ListItem key={file.Key}>
            <ListItemText primary={file.Key} />
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDelete(file.Key)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default S3FileManager;
