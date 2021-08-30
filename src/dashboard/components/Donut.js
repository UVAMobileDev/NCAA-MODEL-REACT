import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Donut = ({ value, size }) => {
  return (
    <CircularProgress
      size={`${size}%`}
      value={value}
      thickness={10}
      variant="determinate"
      color="primary"
    />
  );
};
export default Donut;
