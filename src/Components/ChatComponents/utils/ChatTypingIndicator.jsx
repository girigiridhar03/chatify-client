import React from "react";

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-1 px-4 py-2 text-gray-500 mt-0">
      <span className="text-sm">Typing</span>
      <div className="flex space-x-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
      </div>
    </div>
  );
};

export default TypingIndicator;
