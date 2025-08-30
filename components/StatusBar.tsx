import React from 'react';

interface StatusBarProps {
  resultCount: number;
}

export default function StatusBar({ resultCount }: StatusBarProps) {
  return (
    <div className="statusbar-98">
      <div className="text-xs">
        Returned {resultCount} results.
      </div>
      <div className="status-groove"></div>
      <button className="bottom-btn">
        Get Selected Songs
      </button>
      <button className="bottom-btn">
        Add Selected User to Hot List
      </button>
    </div>
  );
}
