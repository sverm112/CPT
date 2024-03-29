import SideBar from "../SideBar/SideBar";
import { Card } from "react-bootstrap";
import { useState } from "react";
import DownloadManual from "../asset/documents/sample.pdf";
import "./Help.css"
const Help = () => {
    // const [isDownloading, setIsDownloading] = useState(false);

    //   const handleClick = () => {
    //     setIsDownloading(true);
    //     // Make a request to your server to get the PDF file
    //     fetch('src\asset\images\sample.pdf')
    //       .then(response => response.blob())
    //       .then(blob => {
    //         const url = URL.createObjectURL(blob);
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.download = 'my-pdf-file.pdf';
    //         link.click();
    //         setIsDownloading(false);
    //       });
    //   };
    return (
        <>
            <SideBar></SideBar>
            <div className="col-md-12">
                <div className="main-class"      style={{marginLeft: "-45px !important"}}>
                    {/* <div className="row Page-Heading">
                        <h1 className="Heading-Cls" >Help</h1>

                    </div> */}
                    <div className="row page-content">
                        <div className="col-md-6">
                            <h1>We Are Here To Help!</h1>
                            <p>Download The User Manual For CPT.</p>
                            <div>
                                <a href={DownloadManual} download="CPT User Manual" target="_blank">
                                    <button className="btn btn-primary user-manual" > User Manual</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <button onClick={handleClick} disabled={isDownloading}>
      {isDownloading ? 'Downloading...' : 'Download PDF'}
    </button> */}

            </div>
        </>
    )
}

export default Help;