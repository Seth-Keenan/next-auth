import React, { useState, useRef } from 'react';

export function ResizableLayout() {
  const [sidebarWidth, setSidebarWidth] = useState(300); // initial width
  const isResizing = useRef(false);

  const handleMouseDown = () => {
    isResizing.current = true;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing.current) {
      const newWidth = e.clientX;
      if (newWidth > 200 && newWidth < 600) {
        setSidebarWidth(newWidth);
      }
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Sidebar */}
      <div style={{ width: sidebarWidth }} className="bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        <ul>
          <li className="mb-2 hover:bg-gray-700 p-2 rounded">Alice</li>
          <li className="mb-2 hover:bg-gray-700 p-2 rounded">Bob</li>
          <li className="mb-2 hover:bg-gray-700 p-2 rounded">Charlie</li>
        </ul>
      </div>

      {/* Resizer */}
      <div onMouseDown={handleMouseDown} className="w-2 cursor-col-resize bg-gray-500" />

      {/* Right Content */}
      <div className="flex-1 bg-white p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Conversation</h2>
        <div className="h-full border border-gray-300 rounded p-4 overflow-y-auto">
          <p><strong>Alice:</strong> Hey, how are you?</p>
          <p><strong>You:</strong> I'm good, thanks! You?</p>
        </div>
      </div>
    </div>
  );
}
