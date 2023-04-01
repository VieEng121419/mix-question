import React from "react";
import PropTypes from "prop-types";

const Section = (props) => {
    const { type, fill, borderColor, borderWidth, children, cursor, isClose } = props;

    const style = {
        backgroundColor: fill,
        cursor: cursor ? 'pointer' : '',
        borderColor,
        borderWidth
    };

    return (
        <div className={`Section ${type}`} style={style}>
            {children}
        </div>
    );
};

export default Section;

Section.defaultProps = {
    type: "solid",
    fill: "#FFFFFF",
    borderColor: '#1B5D7E',
    borderWidth: '1px',
    cursor: false,
    isClose: false
};

Section.propsType = {
    type: PropTypes.string,
    fill: PropTypes.string,
    cursor: PropTypes.bool,
    isClose: PropTypes.bool
};
