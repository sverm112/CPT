import ExportPdf from "./ExportPdf";
import ExportExcel from "./ExportExcel";

const DownloadBtn = (attributes:any) => {

    return (
        <>
            <div className="row export-doc-row">
                <div className="col-md-12">
                    <button className="btn btn-primary btn-md" id="ExportBox" style={{ marginBottom: "0px" }}>
                        Download <i className="fa fa-download" aria-hidden="true"></i>
                    </button>
                    <div className="export-dropdowns-content" id="export-dropdowns-content" >
                        <ExportPdf columns={attributes.columns} filteredRecords={attributes.filteredRecords} selectors={attributes.selectors} title={attributes.title}></ExportPdf>
                        <ExportExcel columns={attributes.columns} filteredRecords={attributes.filteredRecords} selectors={attributes.selectors} title={attributes.title}></ExportExcel>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DownloadBtn;