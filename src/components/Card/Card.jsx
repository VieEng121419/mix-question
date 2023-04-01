import React from "react";

const Card = (props) => {
    const { title, children } = props;
    return (
        <div className="Card">
            <p className="Card-Title">{title}</p>
            {children}
        </div>
    );
};

export default Card;
