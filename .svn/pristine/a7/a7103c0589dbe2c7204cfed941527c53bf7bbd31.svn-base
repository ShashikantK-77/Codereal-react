import React from "react";
import ReactTooltip from "react-tooltip";

const Tooltip = ({ id, Icon, title, bgColor,  onClick  }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <>
      <p data-tip data-for={id} className="text-xl m-1" onClick={handleClick}>
        <Icon />
      </p>
      <ReactTooltip id={id} backgroundColor={bgColor}>
        <span className="text-sm font-medium">{title}</span>
      </ReactTooltip>
    </>
  );
};

export default Tooltip;
