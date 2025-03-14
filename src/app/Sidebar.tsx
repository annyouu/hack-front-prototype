"use client";

import React, { useState } from "react";
import SidebarButton from "./SidebarButton";
import { FaMousePointer, FaRegStickyNote, FaPen } from "react-icons/fa";
import { FiFileText, FiType } from "react-icons/fi";
import { TbSortAscendingShapesFilled } from "react-icons/tb";
import { LuFrame } from "react-icons/lu";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { BiCommentDetail } from "react-icons/bi";

type SidebarProps = {
  selected: string;
  setSelected: (tool: string) => void;
};

const Sidebar = ({ selected, setSelected }: SidebarProps) => {
  return (
    <div className="fixed top-20 left-6 bg-white rounded shadow-lg px-2 py-4 flex flex-col space-y-4 z-10">
      <SidebarButton
        label="選択ツール"
        icon={<FaMousePointer size={24} />}
        isSelected={selected === '選択ツール'}
        onClick={() => setSelected('選択ツール')}
      />
      <SidebarButton
        label="テンプレート"
        icon={<FiFileText size={24} />}
        isSelected={selected === 'テンプレート'}
        onClick={() => setSelected('テンプレート')}
      />
      <SidebarButton
        label="付箋"
        icon={<FaRegStickyNote size={24} />}
        isSelected={selected === '付箋'}
        onClick={() => setSelected("付箋")}
      />
      <SidebarButton
        label="テキスト"
        icon={<FiType size={24} />}
        isSelected={selected === 'テキスト'}
        onClick={() => setSelected('テキスト')}
      />
      <SidebarButton
        label="図形と線"
        icon={<TbSortAscendingShapesFilled size={24} />}
        isSelected={selected === '図形と線'}
        onClick={() => setSelected('図形と線')}
      />
      <SidebarButton
        label="フリーハンドで描画"
        icon={<FaPen size={24} />}
        isSelected={selected === 'フリーハンドで描画'}
        onClick={() => setSelected('フリーハンドで描画')}
      />
      <SidebarButton
        label="フレーム"
        icon={<LuFrame size={24} />}
        isSelected={selected === 'フレーム'}
        onClick={() => setSelected('フレーム')}
      />
      <SidebarButton
        label="スタンプ"
        icon={<HiOutlineEmojiHappy size={24} />}
        isSelected={selected === 'スタンプ'}
        onClick={() => setSelected('スタンプ')}
      />
      <SidebarButton
        label="コメント"
        icon={<BiCommentDetail size={24} />}
        isSelected={selected === 'コメント'}
        onClick={() => setSelected('コメント')}
      />
    </div>
  );
};

export default Sidebar;
