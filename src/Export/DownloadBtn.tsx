import ExportPdf from "./ExportPdf";
import ExportExcel from "./ExportExcel";

const DownloadBtn = (props:any) => {

    return (
        <>
            <div className="col-md-2 ">
                    <button className="btn btn-primary btn-md" id="ExportBox">
                        Download <i className="fa fa-download" aria-hidden="true"></i>
                    </button>
                    <div className="export-dropdowns-content" id="export-dropdowns-content" >
                        <ExportPdf  filteredRecords={props.filteredRecords} selectedColumnsAndSelectors={props.selectedColumnsAndSelectors} title={props.title}></ExportPdf>
                        <ExportExcel  filteredRecords={props.filteredRecords} selectedColumnsAndSelectors={props.selectedColumnsAndSelectors} title={props.title}></ExportExcel>
                    </div>
                </div>
        </>
    )
}

export default DownloadBtn;