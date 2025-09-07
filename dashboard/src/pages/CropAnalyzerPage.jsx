// src/pages/CropAnalyzerPage.jsx

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import rabiImage from '../assets/images/Rabi.jpg';
import kharifImage from '../assets/images/Kharif.png';
import zaidImage from '../assets/images/Zaid.jpg';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const cropTypes = [
  { key: "rabi", name: "Rabi Crop", image: rabiImage },
  { key: "kharif", name: "Kharif Crop", image: kharifImage },
  { key: "zaid", name: "Zaid Crop", image: zaidImage },
];

// This is the component that shows the file upload UI
function ImageAnalyzer({ cropType, onBack }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setResult(null);
      setError(null);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setPreview(reader.result);
    }
  };

  const handleAnalyzeClick = () => {
    if (!selectedFile) return;

    setLoading(true); // Start loading spinner
    setResult(null);
    setError(null);

    // Simulate a 2.5-second processing delay
    setTimeout(() => {
      // Create your fake result here!
      const fakeResult = {
        disease: "Tomato Late Blight", // You can change this
        confidence: "94.72", // You can change this
      };

      setResult(fakeResult); // Show the fake result
      setLoading(false); // Stop the loading spinner
    }, 2500); // 2500 milliseconds = 2.5 seconds
  };

  return (
    <Paper
      sx={{
        maxWidth: "600px",
        margin: "auto",
        padding: "2rem",
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(10px)",
        borderRadius: "16px",
      }}
    >
      <Button onClick={onBack} sx={{ mb: 2, color: "white" }}>
        ← Back to Crop Selection
      </Button>
      <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
        Analyze {cropTypes.find((c) => c.key === cropType).name}
      </Typography>

      {preview && (
        <Box mt={2} mb={2}>
          <img
            src={preview}
            alt="Selected crop"
            style={{ maxHeight: "200px", borderRadius: "8px" }}
          />
        </Box>
      )}

      <Button
        component="label"
        variant="contained"
        startIcon={<UploadFileIcon />}
        sx={{ mb: 2,mt:5 }}
      >
        {selectedFile ? "Change Image" : "Upload Image"}
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>

      {loading ? (
        <Box my={2}>
          <CircularProgress color="success" />
          <Typography sx={{ color: "white" }}>Analyzing...</Typography>
        </Box>
      ) : (
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleAnalyzeClick}
          disabled={!selectedFile}
          sx={{ display: "block", margin: "auto" }}
        >
          Analyze Crop
        </Button>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {result && (
        <Box mt={4}>
          <Typography variant="h5" sx={{ color: "white" }}>
            Analysis Result:
          </Typography>
          <Alert
            severity={
              result.disease.toLowerCase().includes("healthy")
                ? "success"
                : "warning"
            }
            sx={{ mt: 1 }}
          >
            <Typography variant="h6">
              <strong>Disease:</strong> {result.disease.replace(/_/g, " ")}
            </Typography>
            <Typography variant="body1">
              <strong>Confidence:</strong> {result.confidence}%
            </Typography>
          </Alert>
        </Box>
      )}
    </Paper>
  );
}

// This is the main page component that shows the crop selection
function CropAnalyzerPage() {
  const [selectedCropType, setSelectedCropType] = useState(null);

  // Show the ImageAnalyzer component if a crop type has been selected
  if (selectedCropType) {
    return (
      <Box sx={{ paddingTop: "8rem", textAlign: "center", paddingX: "2rem" }}>
        <ImageAnalyzer
          cropType={selectedCropType}
          onBack={() => setSelectedCropType(null)}
        />
      </Box>
    );
  }

  // Show the crop type selection UI by default
  return (
    <Box sx={{ paddingTop: "8rem", textAlign: "center", paddingX: "2rem" }}>
      <Typography
        variant="h3"
        sx={{ color: "white", fontWeight: "bold", mb: 4 }}
      >
        Select Crop Type 🌾
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {cropTypes.map((crop) => (
          <Grid item key={crop.key} xs={12} sm={8} md={6}>
            <Card
              sx={{
                marginTop:"40px",
                height: "220px", // Gives the card a nice, uniform height
                borderRadius: "16px",
                width:"350px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // This is the key part:
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${crop.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)", // A nice hover effect
                },
              }}
            >
              <CardActionArea
                onClick={() => setSelectedCropType(crop.key)}
                sx={{ height: "100%", display: "flex" }}
              >
                <CardContent>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      textShadow: "2px 2px 8px rgba(0,0,0,0.8)", // Adds shadow to text
                    }}
                  >
                    {crop.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CropAnalyzerPage;
