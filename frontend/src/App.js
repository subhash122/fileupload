import { useState } from 'react';
import './App.css';
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from 'react-bootstrap/Badge';
const apiURL = "http://localhost:8000";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

  }
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (selectedFile) {
      const formData = new FormData();
      formData.append('doc', selectedFile);
      let responseData = await axios({
        method: "post",
        url: `${apiURL}/file`,
        data: formData,
      });
      setIsUploaded(true);
      setDownloadLink(responseData.data.fileLink);
      setSelectedFile(null)
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message ?? "something went wrong. please try again later")
    }

  }
  const downloadFile = async () => {
    window.open(downloadLink, '_blank');
  }
  return (
    <div className="App mt-5">

      <Form onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label>Select File</Form.Label>
          <Form.Control className='w-50' type="file" onChange={handleFileChange} />
          <Form.Text className="text-muted">
            Please select a file to upload.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Upload
        </Button>
      </Form>

      {isUploaded && <>
        <p className='mt-4 text-success mb-0'> File uploaded successfully</p>
        <p className='fw-medium mb-0'>Share the folowing download link for your file:</p>
        <p className="text-info fs-5 mt-1">
          {downloadLink}
        </p>
        <Badge bg="black fs-6 download-btn" onClick={downloadFile}>Download
          <i className="bi bi-download ms-2"></i></Badge>
      </>
      }
    </div>
  );
}

export default App;
