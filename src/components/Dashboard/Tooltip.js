import React from 'react';
import './DashboardLayout.css';

const Tooltip = ({ content, children }) => {
  return (
    <div className="tooltip">
      {children}
      <span className="tooltiptext">{content}</span>
    </div>
  );
};

export default Tooltip;
