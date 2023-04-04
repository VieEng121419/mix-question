import React from "react";
import PropTypes from "prop-types";


const SectionQuestions = (props) => {
    const { isError, isEdit, id, onEdit, index, onChange, children } = props;

    const handleEdit = () => {
        onEdit(id);
    };

    const handleChangeInput = (e) => {
        onChange(e.target.value);
    };

    return (
        <div>
            <div
                className={`Section-Question ${isEdit ? "Edit" : ""} ${isError ? "Error" : ""}`}
                onClick={handleEdit}
            >
                <p className="Section-Question__Number">{index + 1}</p>
                <div className="Section-Question__Content">
                    <p className="Title">Question:</p>
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
            {isError && <p className="Section-Question__Text-Error">Question Field is required.</p>}
        </div>
    );
};

export default SectionQuestions;

SectionQuestions.defaultProps = {
    isEdit: false,
    isError: false
};

SectionQuestions.propsType = {
    isEdit: PropTypes.bool,
    isError: PropTypes.bool
};
