export const uploadToS3 = async (file) => {
    if (!file) {
        throw new Error('No file provided for upload.');
    }

    const fileName = file.name;
    const fileType = file.type;

    try {
        // Step 1 - Get the signed URL from the backend
        const response = await fetch('https://fast-peak-76057-7dc46f68d3e1.herokuapp.com/api/images/sign', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileName, fileType }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to get signed URL: ${errorText}`);
        }

        const { signedUrl, url } = await response.json();

        // Step 2 - Upload the file to S3 using the signed URL
        const uploadResponse = await fetch(signedUrl, {
            method: 'PUT',
            headers: { 'Content-Type': fileType },
            body: file,
        });

        if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text();
            throw new Error(`Failed to upload file to S3: ${errorText}`);
        }

        return url; // Return the public URL of the uploaded file
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};
