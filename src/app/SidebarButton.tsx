"use client";

import React, { useState, useEffect } from 'react';

type SidebarButtonProps = {
  label: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
};

const SidebarButton = ({ label, icon, isSelected, onClick }: SidebarButtonProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (hovering) {
      timer = setTimeout(() => setShowTooltip(true), 100);
    } else {
      setShowTooltip(false);
    }
    return () => clearTimeout(timer);
  }, [hovering]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <button
        onClick={onClick}
        className={`inline-flex w-10 h-10 justify-center items-center rounded group
        ${isSelected ? 'bg-sky-200': 'bg-white hover:bg-gray-100'}`}
      >
        {React.cloneElement(icon as React.ReactElement<any>, {
          className: isSelected
          ? "text-blue-600"
          : "text-gray-700  group-hover:text-blue-500",
        })}
      </button>

      {/* 吹き出し　アイコン上にマウスがある時のみ出す */}
      {showTooltip && !isSelected && (
        <div
          className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 
          w-max px-4 py-2 bg-gray-700 text-white rounded shadow-md z-[9999]"
          style={{
            userSelect: "none",
          }}
        >
          {label}
          {/* 吹き出しの三角形を作成 */}
          <div
            className="absolute top-1/2 left-[-8px] transform -translate-y-1/2 w-0 h-0 
            border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-700 z-[9999]"
            style={{
                transform: "rotate(270deg)",
              }}
          >
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarButton;