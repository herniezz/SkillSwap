import React, { useState } from 'react';

const ImageUploader = () => {
    const [file, setFile] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const fileName = file.name;
        const fileType = file.type;

        // Step 1: Get the signed URL from the backend
        fetch('https://fast-peak-76057-7dc46f68d3e1.herokuapp.com/api/images/sign', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileName, fileType }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to get signed URL');
                }
                return response.json();
            })
            .then(({ signedUrl, url }) => {
                console.log('Signed URL:', signedUrl);

                // Step 2: Upload the file to S3 using the signed URL
                return fetch(signedUrl, {
                    method: 'PUT',
                    headers: { 'Content-Type': fileType },
                    body: file,
                }).then(() => {
                    setUploadedUrl(url); // The public URL of the uploaded file
                    setMessage('File uploaded successfully!');
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('Failed to upload the file.');
            });
    };

    return (
        <div>
            <h1>Image Uploader</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}
            {uploadedUrl && (
                <div>
                    <p>Uploaded File:</p>
                    <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
                        {uploadedUrl}
                    </a>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
