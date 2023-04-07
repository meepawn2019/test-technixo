import React from "react";import "./Cell.css";

export type Shape = "square" | "circle" | "triangle";
export type Color = "red" | "green" | "blue";
export type CellData = {
  shape: Shape;
  color: Color;
};

interface CellProps {
  shape: Shape;
  color: Color;
  revealed: boolean;
  matched: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = (props: CellProps) => {
  const { shape, color, revealed, matched, onClick } = props;
  return (
    <div
      className={`cell ${revealed ? "revealed" : ""} ${
        matched ? "matched" : ""
      }`}
      onClick={onClick}
    >
      {(revealed || matched) && (
        <div className={`shape ${shape} ${color}`}>
          <div className="inner" />
        </div>
      )}
    </div>
  );
};

export default Cell;
