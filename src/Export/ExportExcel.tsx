import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import { read, utils, writeFile } from "xlsx";

const ExportExcel = (attributes: any) => {
    console.log(attributes);
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8';
    const fileExtension = '.xlsx';
    const title = attributes.title;
    // if (attributes.title == "Project Allocation Details"){
    //     headers = [['Resource', 'Resource Type', 'Location',
    //     'Project', 'Project Market', 'Start Date', 'End Date', 'PTO Days', 'Allocation(Hours)']];
    // }
    // else{
    //     headers = [attributes.columns.map((column: any) => column["name"])];
    // }
    const headers = [attributes.selectedColumnsAndSelectors.map((column: any) => column["label"])];
    // const head = headers.map((x:any)=> <thead style={{background:'gray'}}>{x}</thead>)
    console.log(headers);
    const tablebody = attributes.filteredRecords.map((body: any) => {
        let row = [];
        for (let i = 0; i < attributes.selectedColumnsAndSelectors.length; i++)
                row.push(body[attributes.selectedColumnsAndSelectors[i]['value']]);
            return row;
    });
    console.log(headers,tablebody);
    const exportToExcel = async () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(tablebody);
        XLSX.utils.sheet_add_aoa(ws, headers, { origin: "A1" });
        XLSX.utils.book_append_sheet(wb, ws, title);
        XLSX.writeFile(wb, title + fileExtension);
    }

    return (
        <>
            <button id="export-excel-btn" style={{ marginTop: "4px" }} onClick={exportToExcel}>
                <i className="lar la-file-excel"></i> Export <b>Excel</b>
            </button>
        </>
    )
}

export default ExportExcel;