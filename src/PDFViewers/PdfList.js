import React from 'react';

export default function PdfList({ pdfFiles, handlePdfClick }) {
    return (
        <div className='pdf-list' style={styles.pdfList}>
            {pdfFiles.map((pdf, index) => (
                <div key={index} className='pdf-item' style={styles.pdfItem}>
                    <span onClick={() => handlePdfClick(pdf.url)} style={styles.pdfName}>{pdf.name}</span>
                </div>
            ))}
        </div>
    );
}

const styles = {
    pdfList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pdfItem: {
        marginBottom: '10px',
        cursor: 'pointer',
        backgroundColor: '#f0f0f0',
        padding: '10px',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
    },
    pdfName: {
        fontSize: '16px',
    },
};
