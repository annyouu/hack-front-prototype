"use client";

import React, { useRef, useState, useEffect } from "react";
import StickyNote from "./StickyNote";

// StickyNote 型を定義
type StickyNote = {
  id: string;  // id を追加
  x: number;
  y: number;
  text: string;
  width: number;
  height: number;
  color: string;
};

// DrawingCanvasProps 型を定義
type DrawingCanvasProps = {
  selectedTool: string;  // StickyNoteSelectorから選ばれた付箋の色を受け取る
  selectedColor: string;
  onStickyNotePlaced: (id: string) => void;  // id を受け取るように変更
};

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  selectedTool,
  selectedColor,
  onStickyNotePlaced,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([]);
  const [zoom, setZoom] = useState<number>(1);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastTouches = useRef<{ x: number; y: number }[]>([]);

  // コンポーネントがマウントされた際にキャンバスサイズを設定
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, []);

  // 初期化: 付箋のリストをクリア
  useEffect(() => {
    setStickyNotes([]);
  }, []);

  // 付箋を描画する関数
  const drawStickyNotes = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(zoom, zoom);

    stickyNotes.forEach((note) => {
      ctx.fillStyle = note.color;
      ctx.fillRect(note.x, note.y, note.width, note.height);

      ctx.strokeStyle = "gray";
      ctx.lineWidth = 2;
      ctx.strokeRect(note.x, note.y, note.width, note.height);

      ctx.fillStyle = "black";
      ctx.font = "16px sans-serif";
      ctx.fillText(note.text, note.x + 10, note.y + note.height / 2 + 5);
    });
    ctx.restore();
  };

  // stickyNotes や zoom, offset が更新された際に再描画
  useEffect(() => {
    drawStickyNotes();
  }, [stickyNotes, zoom, offset]);

  // キャンバスがクリックされたときの処理
  const handleCanvasClick = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || selectedTool !== "付箋" || !selectedColor) return;

    const x = (e.clientX - rect.left - offset.x) / zoom;
    const y = (e.clientY - rect.top - offset.y) / zoom;

    const newStickyNote: StickyNote = {
      id: Date.now().toString(),  // 一意な ID を生成
      x,
      y,
      text: "新しい付箋",
      width: 120,
      height: 70,
      color: selectedColor,
    };

    setStickyNotes((prev) => [
      ...prev,
      newStickyNote,
    ]);

    // 付箋が貼られたら親コンポーネントに通知
    onStickyNotePlaced(newStickyNote.id);  // id を渡す
  };

  // キャンバスのズーム処理
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const scaleFactor = 1.01;
    if (e.ctrlKey) {
      const zoomChange = e.deltaY < 0 ? scaleFactor : 1 / scaleFactor;
      setZoom((prevZoom) => Math.min(Math.max(prevZoom * zoomChange, 0.5), 3));
    } else {
      setOffset((prev) => ({ x: prev.x - e.deltaX, y: prev.y - e.deltaY }));
    }
  };

  // タッチスタート時の処理
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 2) {
      lastTouches.current = [
        { x: e.touches[0].clientX, y: e.touches[0].clientY },
        { x: e.touches[1].clientX, y: e.touches[1].clientY },
      ];
    }
  };

  // タッチムーブ時の処理
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const newTouches = [
        { x: e.touches[0].clientX, y: e.touches[0].clientY },
        { x: e.touches[1].clientX, y: e.touches[1].clientY },
      ];
      const prevDist = Math.hypot(
        lastTouches.current[0].x - lastTouches.current[1].x,
        lastTouches.current[0].y - lastTouches.current[1].y
      );
      const newDist = Math.hypot(
        newTouches[0].x - newTouches[1].x,
        newTouches[0].y - newTouches[1].y
      );
      const zoomFactor = newDist / prevDist;
      setZoom((prevZoom) => Math.min(Math.max(prevZoom * zoomFactor, 0.2), 3));
      const dx = (newTouches[0].x + newTouches[1].x) / 2 - (lastTouches.current[0].x + lastTouches.current[1].x) / 2;
      const dy = (newTouches[0].y + newTouches[1].y) / 2 - (lastTouches.current[0].y + lastTouches.current[1].y) / 2;
      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      lastTouches.current = newTouches;
    }
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="border border-black"
        onClick={handleCanvasClick}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        style={{ touchAction: "none" }}
      />
      {/* 付箋を描画 */}
      {stickyNotes.map((note) => (
        <StickyNote key={note.id} id={note.id} x={note.x} y={note.y} type={note.color} />
      ))}
    </div>
  );
};

export default DrawingCanvas;
