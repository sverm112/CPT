import jsPDF from "jspdf";
import autoTable, { FontStyle } from "jspdf-autotable";
import { title } from "process";

const ExportPdf = (attributes: any) => {
    
    const downloadData = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
        const marginLeft = 15;
        const pdf = new jsPDF(orientation, unit, size);
        pdf.setFontSize(13);
        pdf.setLineWidth(2);
        // if (attributes.title == "Project Allocation Details"){
        //     headers = [['Resource', 'Resource Type', 'Location',
        //     'Project', 'Project Market', 'Start Date', 'End Date', 'PTO Days', 'Allocation(Hours)']];
        // }
        // else{
        //     headers = [attributes.columns.map((column: any) => column["name"])];
        // }
        const headers = [attributes.selectedColumnsAndSelectors.map((column: any) => column["label"])]
        const tablebody = attributes.filteredRecords.map((body: any) => {
            let row = [];
            for (let i = 0; i < attributes.selectedColumnsAndSelectors.length; i++)
                row.push(body[attributes.selectedColumnsAndSelectors[i]['value']]);
            return row;
        });
        let content = {
            startY: 50,
            tableWidth: 575,
            margin: 10,
            styles: {
                fontSize: 6,
            },
            head: headers,
            body: tablebody,
        };
        pdf.text(attributes.title, marginLeft, 40);
        autoTable(pdf, content);
        pdf.save(attributes.title + '.pdf')
    };

    return (
        <>
            <div className="exportPDF" style={{marginLeft:'-4px'}}>
            <button id="export-pdf-btn" onClick={downloadData}>
                <i className="lar la-file-pdf"></i> Export <b>PDF</b>
            </button>
            </div>
        </>
    )
}

export default ExportPdf;