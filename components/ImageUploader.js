import React, { useState } from 'react';

const ImageUploader = () => {
    const [file, setFile] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState('');
    const [message, setMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        // Validate file size and type
        if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
            setMessage('File size must be less than 5MB.');
            event.target.value = null; // Clear the file input
            return;
        }
        if (selectedFile && !['image/jpeg', 'image/png'].includes(selectedFile.type)) {
            setMessage('Only JPG and PNG files are allowed.');
            event.target.value = null; // Clear the file input
            return;
        }

        setFile(selectedFile);
        setMessage(''); // Clear any previous messages
    };

    const handleUpload = () => {
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        setIsUploading(true);

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
                    headers: {
                        'Content-Type': fileType,
                        'x-amz-acl': 'public-read',
                    },
                    body: file,
                }).then((uploadResponse) => {
                    if (!uploadResponse.ok) {
                        throw new Error('Failed to upload to S3');
                    }
                    setUploadedUrl(url); // The public URL of the uploaded file
                    setMessage('File uploaded successfully!');
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                if (error.message.includes('Failed to get signed URL')) {
                    setMessage('Could not contact the server to generate a signed URL.');
                } else if (error.message.includes('Failed to upload')) {
                    setMessage('File upload to S3 failed.');
                } else {
                    setMessage('An unexpected error occurred.');
                }
            })
            .finally(() => setIsUploading(false));
    };

    return (
        <div>
            <h1>Image Uploader</h1>
            <input
                type="file"
                onChange={handleFileChange}
                aria-disabled={isUploading}
                disabled={isUploading}
            />
            <button onClick={handleUpload} disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Upload'}
            </button>
            {isUploading && <p>Uploading file, please wait...</p>}
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
