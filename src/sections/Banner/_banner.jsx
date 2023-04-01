import React from "react";
import Banner1 from "../../assets/images/Banner-1.png";
import Banner2 from "../../assets/images/Banner-2.png";
import Banner3 from "../../assets/images/Banner-3.png";

const BannerSection = () => {
    return (
        <div className="Banner-Section">
            <div className="grid grid-cols-3 gap-5">
                <div className="flex justify-end items-center">
                    <img src={Banner1} alt="banner1" />
                </div>
                <div className="flex justify-center items-center">
                    <img
                        src={Banner2}
                        alt="banner2"
                        style={{ marginTop: "80px" }}
                    />
                </div>
                <div className="flex justify-start items-center">
                    <img src={Banner3} alt="banner3" />
                </div>
            </div>
        </div>
    );
};

export default BannerSection;
