import React from "react";
import axios from "axios";

interface UploadFormProps {

};

const UploadForm = ({

}: UploadFormProps ) => {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const handleFileUpload = async () => {
        console.log('Upload photo');
        console.log(selectedFile);

        const {data} = await axios.post('http://localhost:3000/upload', {
            pattern: selectedFile
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        console.log(data);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    }

    return (
        <div>
            <input
                type="file"
                name="pattern"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
            />
            <button onClick={handleFileUpload}>Upload!</button>
        </div>
    );
};

export default UploadForm;
