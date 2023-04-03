import React from "react";

const SectionQuestions = (props) => {
    const { isEdit, id, onEdit, index, onChange, children } = props;

    const handleEdit = () => {
        onEdit(id);
    };

    const handleChangeInput = (e) => {
        onChange(e.target.value);
    };

    return (
        <div>
            <div
                className={`Section-Question ${isEdit ? "Edit" : ""}`}
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
        </div>
    );
};

export default SectionQuestions;
