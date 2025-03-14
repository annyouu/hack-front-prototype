"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DrawingCanvas from "./DrawingCanvas";
import StickyNoteSelector from "./StickyNoteSelector";

const Home = () => {
  // 現在選択されているツールを管理（例: "選択ツール", "付箋", ...）
  const [selectedTool, setSelectedTool] = useState<string>("選択ツール");
  const [selectedColor, setSelectedColor] = useState<string>("yellow"); // 付箋の色
  const [isStickyNoteSelectorVisible, setStickyNoteSelectorVisible] = useState<boolean>(false);

  const handleToolChange = (tool: string) => {
    if (tool === "付箋") {
      setSelectedTool(tool);
      setStickyNoteSelectorVisible(true); // 付箋を選んだらフォームを表示
    } else {
      setSelectedTool(tool); // 他のツールを選んだ場合はそのまま変更
    }
  };

  // 付箋の色を選択
  const handleColorSelect = (color: string) => {
    setSelectedColor(color); // 色を選んだら、状態を更新
    setSelectedTool("付箋"); // 色選択後にツールを付箋に変更
    setStickyNoteSelectorVisible(false); // 色選択後にフォームを非表示
  };

  const handleStickyNotePlaced = () => {
    setSelectedTool("選択ツール"); // 付箋を貼った後にツールを選択ツールに戻す
  };

  return (
    <div className="relative w-screen h-screen">
      {/* Sidebar：画面左上に固定、z-index で最前面に表示 */}
      <Sidebar selected={selectedTool} setSelected={handleToolChange} />

      {/* StickyNoteSelector：色選択のため */}
      {selectedTool === "付箋" && isStickyNoteSelectorVisible && (
        <StickyNoteSelector
          onSelect={handleColorSelect}
          onClose={() => setStickyNoteSelectorVisible(false)}
        />
      )}
      
      {/* DrawingCanvas：画面全体を使うキャンバス */}
      <div className="absolute top-0 left-0 w-full h-full"
      style={{
        background: 'linear-gradient(90deg, #f0f0f0 1px, transparent 1px), linear-gradient(180deg, #f0f0f0 1px, transparent 1px)',
        backgroundSize: '100px 100px',
      }}
      >
        <DrawingCanvas selectedTool={selectedTool} selectedColor={selectedColor} onStickyNotePlaced={handleStickyNotePlaced}  /> 
      </div>
    </div>
  );
};

export default Home;
