// src/pages/UploadPage.tsx
import React, { useState } from 'react';
import '../assets/Index.css';

const UploadPage: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)
    );
    setFiles(droppedFiles);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUpload = () => {
    // Simula la carga de imágenes al storage
    alert('Imágenes cargadas al storage');
  };

  const handleNext = () => {
    if (files.length > 0) {
      setCurrentIndex((currentIndex + 1) % files.length);
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">Upload</h2>

      <div
        className="dropzone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        Arrastra y suelta tus imágenes aquí (png, jpeg, jpg)
      </div>

      {files.length > 0 && (
        <div className="preview-container">
          <h3>Preview</h3>
          <img
            className="preview-image"
            src={URL.createObjectURL(files[currentIndex])}
            alt="Preview"
          />

          <div className="button-group">
            <button className="next-button" onClick={handleNext}>
              Siguiente
            </button>
            <button className="upload-button" onClick={handleUpload}>
              Cargar Imágenes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
