import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";

const SectionAnswer = (props) => {
    const { isEdit, id, index, onEdit, onChange, children } = props;
    const [position, setPosition] = useState("");

    const renderPosition = useCallback(() => {
        if (index === 0) setPosition("A");
        if (index === 1) setPosition("B");
        if (index === 2) setPosition("C");
        if (index === 3) setPosition("D");
    }, []);

    const handleEdit = () => {
        onEdit(id);
    };

    const handleChangeInput = (e) => {
        onChange(e.target.value)
    }

    useEffect(() => {
        renderPosition();
    }, []);

    return (
        <div>
            <div
                className={`Section-Answer ${isEdit ? "Edit" : ""}`}
                onClick={handleEdit}
            >
                <div className="Section-Answer__Content">
                    <p className="Title">Answer {position}</p>
                    {isEdit ? (
                        <input className="Section-Answer__Input" value={children} onChange={handleChangeInput}/>
                    ) : (
                        <p className="Content">{children}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SectionAnswer;
