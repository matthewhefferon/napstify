import React from 'react';

interface Win98WindowProps {
  children: React.ReactNode;
  title?: string;
}

export default function Win98Window({ children, title = "Napstify v2.0 BETA 6" }: Win98WindowProps) {
  return (
    <div className="win98-window w-full h-full">
      {/* Title Bar */}
      <div className="win98-titlebar flex justify-between items-center">
        <span>{title}</span>
        <div className="win98-controls">
          <div className="win98-control min" />
          <div className="win98-control max" />
          <div className="win98-control close" />
        </div>
      </div>
      
      {/* Window Content */}
      <div className="content-pad flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
