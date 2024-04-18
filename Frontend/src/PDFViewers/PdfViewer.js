// PdfViewer.js
import React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Worker } from '@react-pdf-viewer/core';

export default function PdfViewer({ selectedPdf }) {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <div className='pdf-container'>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer fileUrl={selectedPdf} plugins={[defaultLayoutPluginInstance]} />
            </Worker>
        </div>
    );
}
