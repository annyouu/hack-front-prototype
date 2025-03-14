// 付箋の設定
"use client";

import React from "react";

type StickyNoteProps = {
    id: string;
    x: number;
    y: number;
    type: string;
};

const colorMap: { [key: string]: string } = {
    yellow: "bg-yellow-300",
    pink: "bg-pink-300",
    blue: "bg-blue-300",
};

const StickyNote = ({ x, y, type }: StickyNoteProps) => {
    const className = colorMap[type];

    return (
        <div
            className={`absolute ${className} rounded bg-transparent`}
            style={{ left: `${x}px`, top: `${y}px` }}
        >
        </div>
    )
}

export default StickyNote;