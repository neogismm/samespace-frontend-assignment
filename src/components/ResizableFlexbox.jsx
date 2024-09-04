import React, { useState, useEffect } from "react";

const ResizableFlexbox = ({ children, height }) => {
  if (React.Children.count(children) !== 3) {
    throw new Error("ResizableFlexbox must have exactly 3 children.");
  }

  const [widths, setWidths] = useState([20, 30, 50]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidths, setStartWidths] = useState([]);
  const [dragIndex, setDragIndex] = useState(null);

  const handleMouseDown = (index, e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartWidths([...widths]);
    setDragIndex(index);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || dragIndex === null) return;

    const deltaX = e.clientX - startX;
    const container = e.target.closest(".resizable-container");
    const containerWidth = container.offsetWidth;

    const percentageChange = (deltaX / containerWidth) * 100;
    const newWidths = [...startWidths];
    newWidths[dragIndex] = startWidths[dragIndex] + percentageChange;
    newWidths[dragIndex + 1] = startWidths[dragIndex + 1] - percentageChange;

    // Prevent items from shrinking too much
    if (newWidths[dragIndex] < 10 || newWidths[dragIndex + 1] < 10) return;

    setWidths(newWidths);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragIndex(null);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      className={`resizable-container flex w-full ${height}`}
      onMouseMove={handleMouseMove}
    >
      {React.Children.map(children, (child, index) => (
        <div style={{ width: `${widths[index]}%` }} className="relative">
          {child}
          {index < 2 && (
            <div
              className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
              onMouseDown={(e) => handleMouseDown(index, e)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ResizableFlexbox;
