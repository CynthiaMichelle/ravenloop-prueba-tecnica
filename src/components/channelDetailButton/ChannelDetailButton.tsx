import React from "react";
import "./ChannelDetailButton.css";
import ChannelDetailButtonProps from "./ChannelDetailButton.interface";

const ChannelDetailButton: React.FC<ChannelDetailButtonProps> = ({
  label,
  onClick,
  isDisabled = false,
}) => {
  return (
    <span className="container-button">
      <button
        className={`channel-detail-button ${isDisabled ? "disabled" : ""}`}
        onClick={isDisabled ? undefined : onClick}
        disabled={isDisabled}
      >
        {label}
      </button>
    </span>
  );
};

export default ChannelDetailButton;
