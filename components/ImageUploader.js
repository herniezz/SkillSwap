import React, { useState } from 'react';
import { uploadToS3 } from '../utils/UploadToS3';

const ImageUploader = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        setUploading(true);

        try {
            const url = await uploadToS3(file); // Use the utility function
            setUploadedUrl(url);
            alert('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file. Check console for details.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h1>Image Uploader</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {uploadedUrl && (
                <div>
                    <h3>Uploaded File:</h3>
                    <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
                        View Uploaded File
                    </a>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
