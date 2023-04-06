import React, { useState } from "react";
import Card from "../../components/Card/Card";
import Section from "../../components/Section/Section";
import UploadIcon from "../../assets/images/Upload.svg";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import CloseIcon from "../../assets/images/Close-Icon.svg";
import CsvFile from "../../assets/images/Csv-File.png";
import Sekeleton from "../../components/Skeleton/_Skeleton";
import LIST_QUESTION_DEFAULT from "../../assets/dummy/questions.json";
import { delay, handleOnChangeInputFile } from "../../utils/_helper";

const Step1Section = (props) => {
    const { setQuestionsList } = props;
    const [progress, setProgress] = useState(0);
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState("");
    const [isShowProgress, setIsShowProgress] = useState(false);

    const convertFileSize = (value) => {
        if (fileSize.length < 7)
            return `${Math.round(+fileSize / 1024).toFixed(2)}kb`;
        return `${(Math.round(+fileSize / 1024) / 1000).toFixed(2)}MB`;
    };

    const fakeProgress = async () => {
        await delay(500);
        setProgress(80);
        await delay(1000);
        setProgress(100);
    };

    const handleChangeFile = async (e) => {
        setProgress(0);
        setIsShowProgress(true);
        await fakeProgress();
        setFileName(e.target.files[0].name);
        setFileSize(e.target.files[0].size);
        handleOnChangeInputFile(e);
    };

    const handleRemoveAllList = () => {
        setQuestionsList(LIST_QUESTION_DEFAULT);
        setIsShowProgress(false);
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
                    onClick={(e) => {
                        e.target.value = ""; //Reset e.target.value to import same file, don't remove
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
                {isShowProgress ? (
                    <Section
                        className="mt-6"
                        fill="#F1F3F4"
                        borderColor="#F1F3F4"
                    >
                        <div className="mb-5 flex flex-row justify-between items-end">
                            <div className="flex justify-start items-center gap-5">
                                <img
                                    className="w-12"
                                    src={CsvFile}
                                    alt="csv-img"
                                />
                                <div className="flex flex-col gap-3">
                                    <p className="Section-Progress__File-Name">
                                        {fileName ? fileName : <Sekeleton />}
                                    </p>
                                    <p className="Section-Progress__Progress-Number">
                                        {fileSize ? (
                                            `${fileSize} KB`
                                        ) : (
                                            <Sekeleton />
                                        )}
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
