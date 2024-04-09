import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "./context";
import Logout from './logout';

export default function Upload() {
    const { auth, url } = useAuth();
    const [documentType, setDocumentType] = useState('');
    const [type, setType] = useState("");
    const [term, setTerm] = useState('');
    const [year, setYear] = useState('');
    const [pdfData, setPdfData] = useState(null);

    const [showTerm, setShowTerm] = useState(false);
    const [showDes, setShowDes] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [message, setMessage] = useState("");

    const { course } = useParams();

    const handleDocumentTypeChange = (event) => {
        setDocumentType(event.target.value);
        setShowDes(true);
    };

    const handleTermChange = (event) => {
        setTerm(event.target.value);
    };

    const handleType = (event) => {
        setType(event.target.value);
        setShowTerm(true);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
        setShowUpload(true);
    };

    const handleFileLoad = (event) => {
        const file = event.target.files[0];
        setPdfData(file);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("course", course);
        formData.append("type", type);
        formData.append('documentType', documentType);
        formData.append('term', term);
        formData.append('year', year);
        formData.append('file', pdfData);

        try {
            const response = await axios.post(`${url}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    // Determine if submit button should be enabled
    const isSubmitDisabled = !documentType || !type || !term || !year || !pdfData;

    return (
        <div style={styles.container}>
            <Logout />
            <h1>Upload the document for {course}</h1>
            <div>
                <label>Select the Document Type:</label>
                <select onChange={handleDocumentTypeChange} style={styles.input}>
                    <option value="">--Select--</option>
                    <option value="A">Assignment</option>
                    <option value="Ou">Outlines</option>
                    <option value="E">Exams</option>
                    <option value="N">Notes</option>
                    <option value="Ot">Others</option>
                </select>
            </div>
            {showDes && (
                <div>
                    <label>Add Description:</label>
                    <input placeholder='Assignment No ,Prof for Outline & Notes' onChange={handleType} style={styles.input} />
                </div>
            )}
            {showTerm && (
                <div>
                    <label htmlFor="termSelect">Select the Term:</label>
                    <select id="termSelect" onChange={handleTermChange} style={styles.input}>
                        <option value="">--Select--</option>
                        <option value="Fall">Fall</option>
                        <option value="Winter">Winter</option>
                        <option value="Summer">Summer</option>
                    </select>
                    <label htmlFor="yearSelect">Enter the Year:</label>
                    <select onChange={handleYearChange} style={styles.input}>
                        <option value="">--Select--</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                    </select>
                </div>
            )}
            {showUpload && (
                <div>
                    <label>Upload Document (PDF only):</label>
                    <input type="file" accept=".pdf" name="file" onChange={handleFileLoad} style={styles.input} />
                </div>
            )}
            <button onClick={handleSubmit} disabled={isSubmitDisabled} style={styles.submitBtn}>Submit</button>
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        marginBottom: '20px', // Add margin-bottom for distance between container end and input box end
    },
    input: {
        width: 'calc(100% - 22px)', // Adjusted width considering padding and border
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginBottom: '15px',
    },
    submitBtn: {
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    message: {
        marginTop: '10px',
        color: '#28a745',
    }
};



