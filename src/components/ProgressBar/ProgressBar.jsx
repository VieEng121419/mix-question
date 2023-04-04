import React from "react";

const ProgressBar = ({ progress }) => {
    const state = `${progress}%`;

    const containerStyle = {
        background: "#FFFFFF",
        borderRadius: "15px"
    };

    const contentStyle = {
        background: "#1B5D7E",
        height: "10px",
        textAlign: "center",
        lineHeight: "10px",
        borderRadius: "15px",
        transition: "0.3s",
        
    };

    return (
        <div style={containerStyle}>
            <div style={{ ...contentStyle, width: state }}>
            </div>
        </div>
    );
};

export default ProgressBar;
