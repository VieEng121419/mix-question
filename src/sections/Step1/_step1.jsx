import React, { useState } from "react";
import Card from "../../components/Card/Card";
import Section from "../../components/Section/Section";
import UploadIcon from "../../assets/images/Upload.svg";
import { handleOnChangeInputFile } from "../../utils/_helper";

const Step1Section = () => {
    return (
        <>
            <p className="Title-Layout">BẮT ĐẦU</p>
            <Card title="Step 1: Upload a file (Optional)">
                <input
                    type="file"
                    style={{ display: "none" }}
                    id="upload-csv"
                    onChange={handleOnChangeInputFile}
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
            </Card>
        </>
    );
};

export default Step1Section;
