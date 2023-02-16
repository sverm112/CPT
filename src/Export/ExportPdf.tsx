import jsPDF from "jspdf";
import autoTable, { FontStyle } from "jspdf-autotable";
import { title } from "process";

const ExportPdf = (attributes: any, headers:any) => {
    
    const downloadData = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
        const marginLeft = 15;
        const pdf = new jsPDF(orientation, unit, size);
        pdf.setFontSize(13);
        pdf.setLineWidth(2);
        if (attributes.title == "Project Allocation Details"){
            headers = [['Resource', 'Resource Type', 'Location',
            'Project', 'Project Market', 'Start Date', 'End Date', 'PTO Days', 'Allocation(Hours)']];
        }
        else{
            headers = [attributes.columns.map((column: any) => column["name"])];
        }
        //const headers = [attributes.columns.map((column: any) => column["name"])]
        const tablebody = attributes.filteredRecords.map((body: any) => {
            let row = [];
            for (let i = 0; i < attributes.selectors.length; i++)
                row.push(body[attributes.selectors[i]]);
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
            <button id="export-pdf-btn" onClick={downloadData}>
                <i className="lar la-file-pdf"></i> Export <b>PDF</b>
            </button>
        </>
    )
}

export default ExportPdf;