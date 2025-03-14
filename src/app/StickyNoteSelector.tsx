"use client";

import React from "react";

type StickyNoteSelectorProps = {
  onSelect: (type: string) => void;
  onClose: () => void;
};

const stickyTypes = [
  { type: "yellow", label: "黄色" },
  { type: "pink", label: "ピンク" },
  { type: "blue", label: "青" },
];

const StickyNoteSelector = ({ onSelect, onClose }: StickyNoteSelectorProps) => {
  return (
    <div className="absolute top-30 left-23 bg-white shadow-lg p-4 rounded z-1">
      <div className="mb-2 font-bold">付箋の種類を選択</div>
      {stickyTypes.map((item) => (
        <button
          key={item.type}
          onClick={() => onSelect(item.type)}
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left mb-1"
        >
          {item.label}
        </button>
      ))}
      <button
        onClick={onClose}  
        className="block px-4 py-2 text-sm text-gray-500 hover:underline mt-2"
      >
        キャンセル
      </button>
    </div>
  );
};

export default StickyNoteSelector;
