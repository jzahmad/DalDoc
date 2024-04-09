import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PdfViewer from '../PDFViewers/PdfViewer';
import PdfList from '../PDFViewers/PdfList';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import axios from 'axios';
import { useAuth } from "./context";
import Logout from './logout';

export default function CourseInfo() {
    const { auth, url } = useAuth();
    const Assignmnetsregex = /.*A.*$/;
    const Notesregex = /.*N.*$/;
    const Othersregex = /.*Ot.*$/;
    const Examsregex = /.*E.*$/;
    const Outlinesregex = /.*Ou.*$/;

    const { course } = useParams();
    const navigate = useNavigate();

    const [value, setValue] = useState(0);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [viewPdf, setViewPdf] = useState(false);
    const [pdffiles, setPdfFiles] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchPdfs = async () => {
            try {
                const response = await axios.post(`${url}/pdfs`, { course: course });
                setPdfFiles(response.data.pdfFiles);
            } catch (error) {
                console.error('Error fetching PDFs:', error);
            }
        };
        fetchPdfs();
    }, [course]);

    const Assignments = pdffiles.filter(pdf => Assignmnetsregex.test(pdf.name));
    const Outlines = pdffiles.filter(pdf => Outlinesregex.test(pdf.name));
    const Exams = pdffiles.filter(pdf => Examsregex.test(pdf.name));
    const Notes = pdffiles.filter(pdf => Notesregex.test(pdf.name));
    const Others = pdffiles.filter(pdf => Othersregex.test(pdf.name));

    const handlePdfClick = (pdfUrl) => {
        setSelectedPdf(pdfUrl);
        setViewPdf(true);
    };

    const goBack = () => {
        setViewPdf(false);
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <Logout />
            <h1>{course}</h1>
            <a style={{ color: '#3f51b5', textDecoration: 'none', marginBottom: '20px', display: 'block' }}>
                any missing document?
            </a>
            <Link to={`/upload/${course}`} style={{ color: '#3f51b5', textDecoration: 'none', marginBottom: '20px', display: 'block' }}>
                Upload
            </Link>
            {viewPdf ? (
                <button
                    onClick={goBack}
                    style={{
                        backgroundColor: '#607d8b',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        marginBottom: '20px',
                        cursor: 'pointer'
                    }}
                >
                    Go Back
                </button>
            ) : null}
            {!viewPdf && (
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    style={{ marginBottom: '20px' }}
                >
                    <Tab label="Assignments" style={{ color: '#3f51b5', fontWeight: 'bold' }} />
                    <Tab label="Outlines" style={{ color: '#3f51b5', fontWeight: 'bold' }} />
                    <Tab label="Exams" style={{ color: '#3f51b5', fontWeight: 'bold' }} />
                    <Tab label="Notes" style={{ color: '#3f51b5', fontWeight: 'bold' }} />
                    <Tab label="Other" style={{ color: '#3f51b5', fontWeight: 'bold' }} />
                </Tabs>
            )}
            {value === 0 && (
                <div className='container'>
                    {viewPdf ? (
                        <PdfViewer selectedPdf={selectedPdf} />
                    ) : (
                        <PdfList pdfFiles={Assignments} handlePdfClick={handlePdfClick} />
                    )}
                </div>
            )}
            {value === 1 && (
                <div className='container'>
                    {viewPdf ? (
                        <PdfViewer selectedPdf={selectedPdf} />
                    ) : (
                        <PdfList pdfFiles={Outlines} handlePdfClick={handlePdfClick} />
                    )}
                </div>
            )}
            {value === 2 && (
                <div className='container'>
                    {viewPdf ? (
                        <PdfViewer selectedPdf={selectedPdf} />
                    ) : (
                        <PdfList pdfFiles={Exams} handlePdfClick={handlePdfClick} />
                    )}
                </div>
            )}
            {value === 3 && (
                <div className='container'>
                    {viewPdf ? (
                        <PdfViewer selectedPdf={selectedPdf} />
                    ) : (
                        <PdfList pdfFiles={Notes} handlePdfClick={handlePdfClick} />
                    )}
                </div>
            )}
            {value === 4 && (
                <div className='container'>
                    {viewPdf ? (
                        <PdfViewer selectedPdf={selectedPdf} />
                    ) : (
                        <PdfList pdfFiles={Others} handlePdfClick={handlePdfClick} />
                    )}
                </div>
            )}
        </div>
    );
}
