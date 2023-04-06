import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "../../assets/images/Close-Icon.svg";

const Section = (props) => {
    const {
        className,
        isShowCloseIcon,
        type,
        fill,
        borderColor,
        borderWidth,
        children,
        cursor,
        onClose
    } = props;

    const style = {
        backgroundColor: fill,
        cursor: cursor ? "pointer" : "",
        borderColor,
        borderWidth,
    };

    return (
        <div className={`Section ${className} ${type}`} style={style}>
            {isShowCloseIcon && <img className="Section-IconClose" src={CloseIcon} alt="close-icon" onClick={() => onClose()}/>}
            {children}
        </div>
    );
};

export default Section;

Section.defaultProps = {
    className: '',
    isShowCloseIcon: false,
    type: "solid",
    fill: "#FFFFFF",
    borderColor: "#1B5D7E",
    borderWidth: "1px",
    cursor: false,
};

Section.propsType = {
    className: PropTypes.string,
    isShowCloseIcon: PropTypes.bool,
    type: PropTypes.string,
    fill: PropTypes.string,
    cursor: PropTypes.bool,
};
