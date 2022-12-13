/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type IProps = {
  tableId?: string;
  data?: any[];
  filename: string;
  fontSize?: number;
};

export const ExportFile: React.FC<IProps> = (props) => {
  /** @Props_Value */
  const { tableId, data, filename, fontSize = 10 } = props;

  /** @Logic_Handler */
  const handleDownloadPdfFile = () => {
    const doc = new jsPDF();

    autoTable(doc, {
      html: `#${tableId}`,
      theme: 'grid',
      styles: {
        fontSize
      }
    });

    // autoTable(doc, {
    //   theme: 'grid',
    //   head: [['Name', 'Email', 'Country']],
    //   body: [
    //     ['David', 'david@example.com', 'Sweden'],
    //     ['Castille', 'castille@example.com', 'Spain']
    //   ]
    // });

    doc.save(`${filename}.pdf`);
  };

  const handleDownloadCsvFile = () => {};

  return (
    <div className="download d-flex justify-content-between align-items-center">
      <div className="me-3">Download as</div>
      <button type="button" className="btn btn-warning btn-sm me-3" onClick={handleDownloadCsvFile}>
        CSV
      </button>
      <button type="button" className="btn btn-danger btn-sm" onClick={handleDownloadPdfFile}>
        PDF
      </button>
    </div>
  );
};
