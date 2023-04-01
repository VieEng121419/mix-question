import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
    const { type, secondary, primary, onClick, children } = props;
    const classes = ["Button", type, primary ? "primary" : "secondary"].join(
        "-"
    );

    return (
        <button
            className={`Button ${classes}`}
            onClick={(e) => onClick(e.target.value)}
        >
            {children}
        </button>
    );
};

export default Button;

Button.defaultProps = {
    type: "default",
    secondary: false,
    primary: true,
};

Button.propsType = {
    type: PropTypes.string,
    secondary: PropTypes.bool,
    primary: PropTypes.bool,
};
