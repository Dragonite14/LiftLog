import React from "react";
import { useDrag } from "react-dnd";

const DragItem = ({ id, text, className }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={className}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {text}
    </div>
  );
};

export default DragItem;