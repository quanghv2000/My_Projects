import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CSVLink } from 'react-csv';

import './export-file.css';

type IProps = {
  tableId?: string;
  data?: any[];
  filename: string;
  fontSize?: number;
};

export const ExportFile: React.FC<IProps> = (props) => {
  /** @Props_Value */
  const { tableId, data, filename, fontSize = 10 } = props;
  const csvReport = { filename: `${filename}.csv`, data };

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

    doc.save(`${filename}.pdf`);
  };

  return (
    <div className="download d-flex justify-content-between align-items-center">
      <div className="me-3">Download as</div>
      <CSVLink {...csvReport}>
        <button type="button" className="btn btn-csv btn-sm me-3">
          CSV
        </button>
      </CSVLink>
      <button type="button" className="btn btn-pdf btn-sm " onClick={handleDownloadPdfFile}>
        PDF
      </button>
    </div>
  );
};
