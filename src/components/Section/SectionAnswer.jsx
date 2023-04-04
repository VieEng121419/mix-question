import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";

const SectionAnswer = (props) => {
    const { isError, isEdit, id, index, onEdit, onChange, children } = props;
    const [position, setPosition] = useState("");

    const renderPosition = useCallback(() => {
        setPosition(String.fromCharCode(index + 65));
    }, []);

    const handleEdit = () => {
        onEdit(id);
    };

    const handleChangeInput = (e) => {
        onChange(e.target.value);
    };

    useEffect(() => {
        renderPosition();
    }, []);

    return (
        <div>
            <div
                className={`Section-Answer ${isEdit ? "Edit" : ""} ${isError ? "Error" : ""}`}
                onClick={handleEdit}
            >
                <div className="Section-Answer__Content">
                    <p className="Title">Answer {position}</p>
                    {isEdit ? (
                        <input
                            className="Section-Answer__Input"
                            value={children}
                            onChange={handleChangeInput}
                            onBlur={() => onEdit(null)}
                            autoFocus={isEdit}
                        />
                    ) : (
                        <p className="Content">{children}</p>
                    )}
                </div>
            </div>
            {isError && <p className="Section-Answer__Text-Error">Answer Field is required.</p>}
        </div>
    );
};

export default SectionAnswer;

SectionAnswer.defaultProps = {
    isEdit: false,
    isError: false
};

SectionAnswer.propsType = {
    isEdit: PropTypes.bool,
    isError: PropTypes.bool
};
