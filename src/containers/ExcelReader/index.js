
import React, { useContext, useRef, useState } from "react";
import XLSX from "xlsx";
import _ from 'lodash';
import CustomButton from "../../ui/Button";
import CustomInput from "../../ui/Input";
import { RoadmapContext } from "../../context";
import { convertToJSON } from "../../services/excelToJsonConverter";
import * as AppConstant from "../../config/appConstants";
import styles from "./excel-reader.module.less";

const ExcelReader = (props) => {
    const roadmapContext = useContext(RoadmapContext);
    const { populateTimelineData } = roadmapContext;
    const [file, setFile] = useState({});
    const fileChanged = useRef(false);


    const onHandleChange = (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            setFile(files[0]);
            fileChanged.current = true;
        };
    }

    const handleFile = (evt) => {
        try {
            if (!fileChanged.current) {
                return;
            }
            const reader = new FileReader();
            const rABS = !!reader.readAsBinaryString;

            reader.onload = (e) => {
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, {
                    type: rABS ? "binary" : "array",
                    bookVBA: true
                });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const excelParsedData = XLSX.utils.sheet_to_json(ws, AppConstant.EXCEL_TO_JSON_CONFIG);
                const parsedJSONData = convertToJSON(excelParsedData);
                //Removed localstorage
                if (sessionStorage) {
                    sessionStorage.setItem("roadmapJSON", JSON.stringify(parsedJSONData));
                }
                populateTimelineData(null, null, parsedJSONData);
                fileChanged.current = false;
            };

            if (rABS) {
                reader.readAsBinaryString(file);
            } else {
                reader.readAsArrayBuffer(file);
            }
        } catch (err) {
            console.error("Error while handling file upload event----", err);
        }
    }

    return (
        <>
            <div className="d-flex p-2">
                <CustomInput type="file"
                    id="fileUpload"
                    fileTypes={AppConstant.EXCEL_FILE_TYPES.join(",")}
                    handleChange={onHandleChange}
                    placeholder="Upload valid excel file"
                    title="Upload valid excel file"></CustomInput>
                <CustomButton handleAction={handleFile}
                    variant="contained"
                    disabled={!file.name}
                    color="primary"
                    btnLabel="Upload"></CustomButton>
            </div>
        </>
    );
}

export default ExcelReader;
