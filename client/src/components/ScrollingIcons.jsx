import React from "react";

import icon1 from "../assets/icons/icon1.svg";
import icon2 from "../assets/icons/icon2.svg";
import icon3 from "../assets/icons/icon3.svg";
import icon4 from "../assets/icons/icon4.svg";
import icon5 from "../assets/icons/icon5.svg";
import icon6 from "../assets/icons/icon6.svg";
import icon7 from "../assets/icons/icon7.svg";
import icon8 from "../assets/icons/icon8.svg";

const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8];

const ScrollingIcons = () => {
  return (
    <div className="scrolling-wrapper">
      <div className="scrolling-track">
        {icons.map((src, index) => (
          <img key={index} src={src} alt={`icon-${index}`} className="scroll-icon" />
        ))}
        {/* Duplicate icons for smooth infinite scroll */}
        {icons.map((src, index) => (
          <img key={`duplicate-${index}`} src={src} alt={`icon-${index}`} className="scroll-icon" />
        ))}
      </div>
    </div>
  );
};

export default ScrollingIcons;
