import React, { useState, DragEvent } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);

    const formData = new FormData();
    droppedFiles.forEach((file) => {
      formData.append('file', file);
    });

    axios.post('http://localhost:8000/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error(error);
    });
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div 
      onDrop={handleDrop} 
      onDragOver={handleDragOver} 
      style={{ border: '2px dashed #0087F7', padding: '20px' }}
    >
      <p>Drag 'n' drop some files here, or click to select files</p>
      {files.map((file, index) => (
        <p key={index}>{file.name}</p>
      ))}
    </div>
  );
}

export default App;
