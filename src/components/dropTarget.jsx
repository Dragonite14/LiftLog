// DropZone.js
import React from "react";
import { useDrop } from "react-dnd";

const DropZone = ({ id, onDrop, className, children, setOpenModal, openModal, day, setDayClicked }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "item",
    drop: (item) => onDrop(id, item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const dropClassName = isOver ? "drop-target is-over" : "drop-target";

  return (
    <div ref={drop} className={`${dropClassName} ${className}`} onClick={()=>{
      setOpenModal(true)
      setDayClicked(day)
      }}>
      {children}
    </div>
  );
};

export default DropZone;
