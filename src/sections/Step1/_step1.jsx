import React, { useState } from "react";
import Card from "../../components/Card/Card";
import Section from "../../components/Section/Section";
import UploadIcon from "../../assets/images/Upload.svg";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import CloseIcon from "../../assets/images/Close-Icon.svg";
import CsvFile from "../../assets/images/Csv-File.png";
import { handleOnChangeInputFile } from "../../utils/_helper";

const Step1Section = (props) => {
    const { questionsList, setQuestionsList } = props;
    const [progress, setProgress] = useState(0);
    const [fileName, setFileName] = useState(0);
    const [fileSize, setFileSize] = useState(0);
    const [changeFile, setChangeFile] = useState(false);

    const convertFileSize = (value) => {
        if (fileSize.length < 7)
            return `${Math.round(+fileSize / 1024).toFixed(2)}kb`;
        return `${(Math.round(+fileSize / 1024) / 1000).toFixed(2)}MB`;
    };

    const handleChangeFile = (e) => {
        setProgress(100);
        setFileName(e.target.files[0].name);
        setFileSize(e.target.files[0].size);
        handleOnChangeInputFile(e);
        setChangeFile(true);
    };

    const handleRemoveAllList = () => {
        setQuestionsList([])
    };

    return (
        <>
            <p className="Title-Layout">BẮT ĐẦU</p>
            <Card title="Step 1: Upload a file (Optional)">
                <input
                    type="file"
                    style={{ display: "none" }}
                    id="upload-csv"
                    onChange={(e) => {
                        handleChangeFile(e);
                    }}
                    accept={".csv"}
                />
                <label htmlFor="upload-csv">
                    <Section type="dot" borderColor="#1B5D7E" cursor>
                        <div className="Section-Upload">
                            <img src={UploadIcon} alt="upload-icon" />
                            <div className="Section-Upload__Text">
                                Drag & Drop or Choose file to upload
                            </div>
                            <p className="Section-Upload__Text">
                                CSV support only
                            </p>
                        </div>
                    </Section>
                </label>
                <div className="mt-6"></div>
                {changeFile || questionsList.length ? (
                    <Section fill="#F1F3F4" borderColor="#F1F3F4">
                        <div className="mb-5 flex flex-row justify-between items-end">
                            <div className="flex justify-start items-center gap-5">
                                <img
                                    className="w-12"
                                    src={CsvFile}
                                    alt="csv-img"
                                />
                                <div className="flex flex-col gap-3">
                                    <p className="Section-Progress__File-Name">
                                        {fileName}
                                    </p>
                                    <p className="Section-Progress__Progress-Number">
                                        {`${fileSize} KB`}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-end items-end gap-4">
                                <img
                                    className="w-4 cursor-pointer"
                                    src={CloseIcon}
                                    alt="delete-list-icon"
                                    onClick={handleRemoveAllList}
                                />
                                <p className="Section-Progress__Progress-Number">{`${progress}%`}</p>
                            </div>
                        </div>
                        <ProgressBar progress={progress} />
                    </Section>
                ) : null}
            </Card>
        </>
    );
};

export default Step1Section;
