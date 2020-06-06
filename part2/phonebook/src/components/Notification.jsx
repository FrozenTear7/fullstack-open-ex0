import React from "react";

const Notification = ({ errorMessage }) => {
  if (!errorMessage || !errorMessage.message) {
    return null;
  }

  return (
    <div
      className={`notification ${
        errorMessage.isPositive ? "success" : "error"
      }`}
    >
      {errorMessage.message}
    </div>
  );
};

export default Notification;
